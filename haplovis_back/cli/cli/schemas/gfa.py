from enum import IntEnum
from typing import Any, Dict, List, Optional
from pydantic.dataclasses import dataclass

segment_optional_fields = ["LN", "RC", "FC", "KC", "SH", "UR"]
link_optional_fields = ["MQ", "NM", "RC", "FC", "KC", "ID"]

@dataclass
class GFA_ELEMENT(IntEnum):
    SEGMENT = 0
    LINK = 1
    PATH = 2

@dataclass
class GfaElement:
    # TODO: change any to union of more specific types
    type: str
    name: str
    optionals: Optional[Dict[str, Any]]

@dataclass
class GfaPath(GfaElement):
    segment_names: List[str]
    index: int
    type = "path"
    optionals = None
    # TODO: overlaps

@dataclass
class GfaSegment(GfaElement):
    sequence: str
    paths: List[int]
    type = "segment"
    optionals = None

@dataclass
class GfaLink(GfaElement): 
    from_segment: str
    from_orient: str
    to_segment: str
    to_orient: str
    paths: List[int]
    type = "link"
    optionals = None
    # TODO: overlap

    def __hash__(self):
        return hash(self.name)

@dataclass
class Gfa:
    segments: List[GfaSegment]
    links: List[GfaLink]
    paths: List[GfaPath]

@dataclass
class GfaInfo:
    # TODO:  add more
    n_segments: int
    n_links: int
    n_paths: int
