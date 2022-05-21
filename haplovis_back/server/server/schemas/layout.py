from typing import Dict, List
from cli.schemas.layout import Position
from pydantic import BaseModel, dataclasses


@dataclasses.dataclass
class RectangleRange:
    lu: Position
    rd: Position


class Densities(BaseModel):
    down_sample_factor: int
    densities: List[int]


@dataclasses.dataclass
class LayoutNode:
    segment_id: str
    position: Position


Layout = Dict[str, LayoutNode]
