from typing import Optional
from pydantic.dataclasses import dataclass
from haplovis.schemas.layout import Position, RectangleRange


@dataclass
class Bookmark:
    elem_id: str
    elem_type: str
    comment: str
    viewport: RectangleRange
    elem_pos: Optional[Position] = None
