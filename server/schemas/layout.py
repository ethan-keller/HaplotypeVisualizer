from turtle import position
from typing import Dict, List
from pydantic import BaseModel


class Position(BaseModel):
    x: float
    y: float


class HorizontalBounds(BaseModel):
    x1: float
    x2: float


class Layout(BaseModel):
    positions: Dict[str, Position]

class LayoutAndDensity(BaseModel):
    positions: Dict[str, Position]
    x_coord: List[int]
    densities: List[int]
