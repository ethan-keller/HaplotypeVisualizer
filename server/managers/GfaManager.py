from typing import Any, Dict, List, Optional
from gfapy import Gfa as GfaPy
from gfapy.line.line import Line

from schemas.gfa import Gfa, GFA_ELEMENT, GfaLink, GfaPath, GfaSegment, link_optional_fields, segment_optional_fields
from managers.FileManager import FileManager
from schemas.file import FileIndex
from errors.PydanticConversionError import PydanticConversionError


class GfaManager:
    __gfa: GfaPy = None
    gfa: Optional[Gfa] = None

    @classmethod
    def prepare_gfa(cls) -> None:
        file_name = FileManager.files[FileIndex.GFA].name

        if not file_name:
            raise ValueError("No GFA found. Cannot prepare for visualization.")

        read_gfa = GfaPy.from_file(FileManager.files_base_path + file_name)
        cls.__gfa = read_gfa

        # Create needed data structures
        cls.gfa = cls.create_gfa(read_gfa)

    @classmethod
    def create_gfa(cls, gfa: GfaPy) -> Gfa:
        segments = cls.convert_segments_to_pydantic(gfa.segments)
        links = cls.convert_links_to_pydantic(gfa.dovetails)
        paths = cls.convert_paths_to_pydantic(gfa.paths)

        segmentMap: Dict[str, GfaSegment] = {}
        for segment in segments:
            segmentMap[segment.name] = segment

        linkMap: Dict[str, GfaLink] = {}
        for link in links:
            linkMap[link.name] = link

        for path in paths:
            s_names = path.segment_names
            for i in range(len(s_names) - 1):
                segmentMap[s_names[i]].paths.append(path)
                linkMap[cls.get_link_name(s_names[i], s_names[i + 1])].paths.append(path)
            segmentMap[s_names[len(s_names) - 1]].paths.append(path)

        cls.gfa = Gfa(segments=list(segmentMap.values()), links=list(linkMap.values()), paths=paths)

        return cls.gfa

    @classmethod
    def recognize(cls, file_path: str) -> bool:
        # check hash
        # TODO: implement
        return False

    @classmethod
    def convert_segments_to_pydantic(cls, segments: List[Line]) -> List[GfaSegment]:
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
            name=segment.name,
            sequence=str(segment.sequence),
            optionals=cls._convert_optional_fields_to_pydantic(segment, GFA_ELEMENT.SEGMENT),
            paths=[],
        )

    @classmethod
    def convert_links_to_pydantic(cls, links: List[Line]) -> List[GfaLink]:
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
            name=cls.get_link_name(link.from_segment.name, link.to_segment.name),
            from_segment=link.from_segment.name,
            from_orient=link.from_orient,
            to_segment=link.to_segment.name,
            to_orient=link.to_orient,
            optionals=cls._convert_optional_fields_to_pydantic(link, GFA_ELEMENT.LINK),
            paths=[],
        )

    @classmethod
    def convert_paths_to_pydantic(cls, paths: List[Line]) -> List[GfaPath]:
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
            name=path.path_name, segment_names=list(map(lambda segment: segment.name, path.segment_names)), index=i
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
