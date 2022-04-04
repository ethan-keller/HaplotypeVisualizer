from typing import Dict

from schemas.bookmark import Bookmark


class BookmarkManager:
    bookmarks: Dict[str, Bookmark] = {}

    @classmethod
    def add_bookmark(cls, elem_id, comment) -> None:
        cls.bookmarks[elem_id] = Bookmark(elem_id=elem_id, comment=comment)

    @classmethod
    def remove_bookmark(cls, elem_id) -> None:
        cls.bookmarks.pop(elem_id)

    @classmethod
    def clear_bookmarks(cls) -> None:
        cls.bookmarks = {}
