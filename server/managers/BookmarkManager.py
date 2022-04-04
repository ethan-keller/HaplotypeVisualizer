from typing import Dict

from schemas.bookmark import Bookmark


class BookmarkManager:
    bookmarks: Dict[str, Bookmark] = {}
