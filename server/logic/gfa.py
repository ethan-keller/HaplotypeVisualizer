from typing import Any, Dict, List, Optional

from errors.PydanticConversionError import PydanticConversionError
from gfapy.line.line import Line
from gfapy import Gfa as GfaPy
from schemas.file import FileIndex
from schemas.gfa import GFA_ELEMENT, Gfa, GfaLink, GfaPath, GfaSegment, link_optional_fields, segment_optional_fields
from server_data.data import GfaManager, files, files_base_path


def prepare_gfa() -> None:
    file_name = files[FileIndex.GFA].name
    if file_name:
        read_gfa = GfaPy.from_file(files_base_path + file_name)
        GfaManager.__gfa = read_gfa

        segments = convert_segments_to_pydantic(read_gfa.segments)
        links = convert_links_to_pydantic(read_gfa.dovetails)
        paths = convert_paths_to_pydantic(read_gfa.paths)

        segmentMap: Dict[str, GfaSegment] = {}
        for segment in segments:
            segmentMap[segment.name] = segment

        linkMap: Dict[str, GfaLink] = {}
        for link in links:
            linkMap[link.name] = link

        for path in paths:
            for i in range(len(path.segment_names) - 1):
                segmentMap[path.segment_names[i]].paths.append(path)
                linkMap[get_link_name(path.segment_names[i], path.segment_names[i + 1])].paths.append(path)

        GfaManager.gfa = Gfa(
            segments=convert_segments_to_pydantic(read_gfa.segments),
            links=convert_links_to_pydantic(read_gfa.dovetails),
            paths=paths,
        )
    else:
        raise ValueError("Since the GFA file path has not been uploaded, the GFA file cannot be prepared")


def convert_segments_to_pydantic(segments: List[Line]) -> List[GfaSegment]:
    if not segments:
        raise PydanticConversionError(str(Line), str(List[GfaSegment]), "'segments' is None")

    if len(segments) == 0:
        return []

    return list(map(lambda segment: _convert_segment_to_pydantic(segment), segments))


def _convert_segment_to_pydantic(segment: Line) -> GfaSegment:
    if not segment:
        raise PydanticConversionError(str(Line), str(GfaSegment), "'segment' is None")

    return GfaSegment(
        name=segment.name,
        sequence=str(segment.sequence),
        optional_fields=_convert_optional_fields_to_pydantic(segment, GFA_ELEMENT.SEGMENT),
        paths=[],
    )


def convert_links_to_pydantic(links: List[Line]) -> List[GfaLink]:
    if not links:
        raise PydanticConversionError(str(Line), str(List[GfaLink]), "'links' is None")

    if len(links) == 0:
        return []

    return list(map(lambda link: _convert_link_to_pydantic(link), links))


def _convert_link_to_pydantic(link: Line) -> GfaLink:
    if not link:
        raise PydanticConversionError(str(Line), str(GfaLink), "'link' is None")

    return GfaLink(
        name=get_link_name(link.from_segment.name, link.to_segment.name),
        from_segment=link.from_segment.name,
        from_orient=link.from_orient,
        to_segment=link.to_segment.name,
        to_orient=link.to_orient,
        optional_fields=_convert_optional_fields_to_pydantic(link, GFA_ELEMENT.LINK),
        paths=[],
    )


def convert_paths_to_pydantic(paths: List[Line]) -> List[GfaPath]:
    if not paths:
        raise PydanticConversionError(str(Line), str(List[GfaPath]), "'paths' is None")

    if len(paths) == 0:
        return []

    return list(map(lambda path: _convert_path_to_pydantic(path), paths))


def _convert_path_to_pydantic(path: Line) -> GfaPath:
    if not path:
        raise PydanticConversionError(str(Line), str(GfaPath), "'path' is None")

    return GfaPath(name=path.path_name, segment_names=list(map(lambda segment: segment.name, path.segment_names)))


def _convert_optional_fields_to_pydantic(line: Line, element_type: GFA_ELEMENT) -> Optional[Dict[str, Any]]:
    if not line:
        raise PydanticConversionError(str(Line), str(Dict[str, Any]), "No optional fields in None")

    if element_type == GFA_ELEMENT.SEGMENT:
        return _fields_to_dict(line, segment_optional_fields)
    elif element_type == GFA_ELEMENT.LINK:
        return _fields_to_dict(line, link_optional_fields)
    else:
        # TODO: add more elif's
        return None


def _fields_to_dict(line: Line, fields: List[str]) -> Optional[Dict[str, Any]]:
    optional_field_dict = {}
    for field in fields:
        value = line.get(field)
        if value:
            optional_field_dict[field] = value

    if len(optional_field_dict) == 0:
        return None
    else:
        return optional_field_dict


def get_link_name(from_segment: str, to_segment: str) -> str:
    return f"{from_segment}-{to_segment}"
