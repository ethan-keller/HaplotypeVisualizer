from enum import IntEnum
from typing import Any, Dict, List, Optional

from pydantic import BaseModel

segment_optional_fields = ["LN", "RC", "FC", "KC", "SH", "UR"]
link_optional_fields = ["MQ", "NM", "RC", "FC", "KC", "ID"]


class GFA_ELEMENT(IntEnum):
    SEGMENT = 0
    LINK = 1
    PATH = 2


class GfaElement(BaseModel):
    # TODO: change any to union of more specific types
    name: str
    optional_fields: Optional[Dict[str, Any]] = None


class GfaPath(GfaElement):
    segment_names: List[str]
    # TODO: overlaps


class GfaSegment(GfaElement):
    sequence: str
    paths: List[GfaPath]


class GfaLink(GfaElement):
    from_segment: str
    from_orient: str
    to_segment: str
    to_orient: str
    paths: List[GfaPath]
    # TODO: overlap


class Gfa(BaseModel):
    segments: List[GfaSegment]
    links: List[GfaLink]
    paths: List[GfaPath]

class GfaInfo(BaseModel):
    # TODO:  add more
    n_segments: int
    n_links: int
    n_paths: int
