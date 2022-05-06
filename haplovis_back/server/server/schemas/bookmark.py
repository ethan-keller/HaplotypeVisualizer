from pydantic.dataclasses import dataclass

@dataclass
class Bookmark:
    elem_id: str
    comment: str
