from typing import Dict, Tuple
from pydantic.dataclasses import dataclass


@dataclass
class Position:
    x: float
    y: float

@dataclass
class Bounds:
    xl: float
    xr: float

@dataclass
class Layout:
    nodes: Dict[str, Tuple[Position, Bounds]]