from typing import Dict, List
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
 
Layout = Dict[str, Position]

# class LayoutNode(BaseModel):
#     segment: str
#     position: Position
#     # TODO: bounds
#     # xl: float
#     # xr: float

