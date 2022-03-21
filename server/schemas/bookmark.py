from pydantic import BaseModel


class Bookmark(BaseModel):
    elem_id: str
    description: str
