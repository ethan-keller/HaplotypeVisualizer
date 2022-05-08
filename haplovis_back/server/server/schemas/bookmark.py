from pydantic.dataclasses import dataclass
from server.schemas.layout import RectangleRange

@dataclass
class Bookmark:
    elem_id: str
    comment: str
    viewport: RectangleRange
