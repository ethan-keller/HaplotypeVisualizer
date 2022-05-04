from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple, Union
from gfapy import Line, Gfa as GfaPy
import hashlib
from cli.schemas.gfa import Gfa as GfaDataClass, GfaSegment, GfaLink, GfaPath, GFA_ELEMENT, segment_optional_fields, link_optional_fields
from cli.errors.PydanticConversionError import PydanticConversionError
from cli.serialization import JsonSerializer

class Gfa:
    def __init__(self, segments: List[GfaSegment], links: List[GfaLink], paths: List[GfaPath]) -> None:
        self.segments = segments
        self.links = links
        self.paths = paths

    def to_data_class(self) -> GfaDataClass:
        return GfaDataClass(self.segments, self.links, self.paths)

    @classmethod
    def from_data_class(cls, gfa: GfaDataClass) -> "Gfa":
        return cls(segments=gfa.segments, links=gfa.links, paths=gfa.paths)

    @classmethod
    def serialize(cls, gfa: "Gfa", out_file: str = None) -> str:
        return JsonSerializer.serialize(gfa.to_data_class(), out_file)

    @classmethod
    def deserialize(cls, sb: Union[bytes, str] = None, from_file: str = None) -> "Gfa":
        return cls.from_data_class(GfaDataClass.__pydantic_model__.parse_obj(JsonSerializer.deserialize(sb, from_file)))

    @classmethod
    def get_gfa_hash(cls, file_path: Path) -> Optional[str]:
        h = None
        try:
            with open(file_path, "rb") as f:
                data = f.read()
                h = hashlib.md5(data).hexdigest()
        except:
            h = None
        return h

    @classmethod
    def read_gfa_from_file(cls, path: Path) -> "Gfa":
        read_gfa = GfaPy.from_file(path)
        return cls._gfapy_to_gfa(read_gfa)

    @classmethod
    def _gfapy_to_gfa(cls, read_gfa: GfaPy) -> "Gfa":
        segments = cls._create_segments(read_gfa.segments)
        links = cls._create_links(read_gfa.dovetails)
        paths = cls._create_paths(read_gfa.paths)

        segmentMap: Dict[str, GfaSegment] = {segment.name: segment for segment in segments}
        linkMap: Dict[str, GfaLink] = {link.name: link for link in links}

        for path in paths:
            s_names = path.segment_names
            for i in range(len(s_names) - 1):
                segmentMap[s_names[i]].paths.append(path)
                linkMap[cls.get_link_name(s_names[i], s_names[i + 1])].paths.append(path)
            segmentMap[s_names[-1]].paths.append(path)

        return Gfa(segments=segments, links=links, paths=paths)

    @classmethod
    def _create_segments(cls, segments: List[Line]) -> List[GfaSegment]:
        if not segments:
            raise PydanticConversionError(str(Line), str(List[GfaSegment]), "'segments' is None")

        if len(segments) == 0:
            return []

        return list(map(lambda segment: cls._convert_segment_to_pydantic(segment), segments))

    @classmethod
    def _convert_segment_to_pydantic(cls, segment: Line) -> GfaSegment:
        if not segment:
            raise PydanticConversionError(str(Line), str(GfaSegment), "'segment' is None")

        return GfaSegment(
            type="segment",
            name=segment.name,
            sequence=str(segment.sequence),
            optionals=cls._convert_optional_fields_to_pydantic(segment, GFA_ELEMENT.SEGMENT),
            paths=[],
        )

    @classmethod
    def _create_links(cls, links: List[Line]) -> List[GfaLink]:
        if not links:
            raise PydanticConversionError(str(Line), str(List[GfaLink]), "'links' is None")

        if len(links) == 0:
            return []

        return list(map(lambda link: cls._convert_link_to_pydantic(link), links))

    @classmethod
    def _convert_link_to_pydantic(cls, link: Line) -> GfaLink:
        if not link:
            raise PydanticConversionError(str(Line), str(GfaLink), "'link' is None")

        return GfaLink(
            type="link",
            name=cls.get_link_name(link.from_segment.name, link.to_segment.name),
            from_segment=link.from_segment.name,
            from_orient=link.from_orient,
            to_segment=link.to_segment.name,
            to_orient=link.to_orient,
            optionals=cls._convert_optional_fields_to_pydantic(link, GFA_ELEMENT.LINK),
            paths=[],
        )

    @classmethod
    def _create_paths(cls, paths: List[Line]) -> List[GfaPath]:
        if not paths:
            raise PydanticConversionError(str(Line), str(List[GfaPath]), "'paths' is None")

        if len(paths) == 0:
            return []

        return list(map(lambda t: cls._convert_path_to_pydantic(t[1], t[0]), enumerate(paths)))

    @classmethod
    def _convert_path_to_pydantic(cls, path: Line, i: int) -> GfaPath:
        if not path:
            raise PydanticConversionError(str(Line), str(GfaPath), "'path' is None")

        return GfaPath(
            type="path",
            name=path.path_name,
            segment_names=list(map(lambda segment: segment.name, path.segment_names)),
            index=i,
            optionals=cls._convert_optional_fields_to_pydantic(path, GFA_ELEMENT.PATH),
        )

    @classmethod
    def _convert_optional_fields_to_pydantic(cls, line: Line, element_type: GFA_ELEMENT) -> Optional[Dict[str, Any]]:
        if not line:
            raise PydanticConversionError(str(Line), str(Dict[str, Any]), "No optional fields in None")

        if element_type == GFA_ELEMENT.SEGMENT:
            return cls._fields_to_dict(line, segment_optional_fields)
        elif element_type == GFA_ELEMENT.LINK:
            return cls._fields_to_dict(line, link_optional_fields)
        else:
            # TODO: add more elif's
            return None

    @classmethod
    def _fields_to_dict(cls, line: Line, fields: List[str]) -> Optional[Dict[str, Any]]:
        optional_field_dict = {}
        for field in fields:
            value = line.get(field)
            if value:
                optional_field_dict[field] = value

        if len(optional_field_dict) == 0:
            return None
        else:
            return optional_field_dict

    @classmethod
    def get_link_name(cls, from_segment: str, to_segment: str) -> str:
        return f"{from_segment}->{to_segment}"
    
    @classmethod
    def split_link_name(cls, link_name: str) -> Tuple[str, str]:
        s = link_name.split("->")
        return s[0], s[1]
