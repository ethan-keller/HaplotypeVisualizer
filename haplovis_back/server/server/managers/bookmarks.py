from typing import Dict
from server.schemas.bookmark import Bookmark


class BookmarkManager:
    bookmarks: Dict[str, Bookmark] = {}

    @classmethod
    def add_bookmark(cls, elem_id: str, comment: str) -> None:
        cls.bookmarks[elem_id] = Bookmark(elem_id=elem_id, comment=comment)

    @classmethod
    def remove_bookmark(cls, elem_id) -> None:
        cls.bookmarks.pop(elem_id)

    @classmethod
    def clear_bookmarks(cls) -> None:
        cls.bookmarks = {}

    @classmethod
    def contains_bookmark(cls, elem_id: str) -> bool:
        return elem_id in cls.bookmarks
