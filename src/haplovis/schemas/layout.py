from typing import Dict, List, Tuple
from pydantic import BaseModel, dataclasses


@dataclasses.dataclass
class Position:
    x: float
    y: float


@dataclasses.dataclass
class Bounds:
    xl: float
    xr: float


LayoutCLI = Dict[str, Tuple[Position, Bounds]]


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
