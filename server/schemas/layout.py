from typing import Dict, List
from pydantic import BaseModel


class Position(BaseModel):
    x: int
    y: int


class Layout(BaseModel):
    positions: Dict[str, Position]


class Bounds(BaseModel):
    xl: int
    xr: int


class LayoutAndBounds(BaseModel):
    layout: Layout
    bounds: List[Bounds]


class LayoutAndDensity(BaseModel):
    layout: Layout
    xs: List[int]
    densities: List[int]
