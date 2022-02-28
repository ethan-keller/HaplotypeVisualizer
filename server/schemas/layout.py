from typing import Dict
from pydantic import BaseModel

class Position(BaseModel):
    x: float
    y: float

class Layout(BaseModel):
    positions: Dict[str, Position]