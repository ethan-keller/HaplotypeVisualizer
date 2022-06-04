from pydantic.dataclasses import dataclass
from haplovis.schemas.layout import RectangleRange


@dataclass
class Bookmark:
    elem_id: str
    comment: str
    viewport: RectangleRange
