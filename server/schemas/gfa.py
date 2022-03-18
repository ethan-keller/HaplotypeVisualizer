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
    type: str
    name: str
    optionals: Optional[Dict[str, Any]] = None


class GfaPath(GfaElement):
    type = "path"
    segment_names: List[str]
    # TODO: overlaps


class GfaSegment(GfaElement):
    type = "segment"
    sequence: str
    paths: List[GfaPath]


class GfaLink(GfaElement):
    type = "link"
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


class GfaHist(BaseModel):
    hist: List[float]
    bin_edges: List[float]
