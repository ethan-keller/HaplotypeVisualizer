from typing import List
from pydantic import BaseModel

class Position(BaseModel):
    x: float
    y: float

class RectangleRange(BaseModel):
    lu: Position
    rd: Position

class Density(BaseModel):
    xs: List[int]
    densities: List[int]

class LayoutNode(BaseModel):
    segment: str
    x: float
    y: float
    # TODO: bounds
    # xl: float
    # xr: float

