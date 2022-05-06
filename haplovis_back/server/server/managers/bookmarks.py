import os
from pathlib import Path
from typing import Dict, Optional
from cli.serialization import JsonSerializer
from fastapi import UploadFile
from server.managers.files import FileManager
from server.managers.gfa import GfaManager
from server.schemas.bookmark import Bookmark
from server.schemas.file import FileIndex, FileStatus


class BookmarkManager:
    bookmarks: Optional[Dict[str, Bookmark]] = None
    bookmarks_file_path: Optional[Path] = None

    @classmethod
    def add_bookmark(cls, elem_id: str, comment: str) -> None:
        if cls.bookmarks is not None:
            cls.bookmarks[elem_id] = Bookmark(elem_id=elem_id, comment=comment)

    @classmethod
    def remove_bookmark(cls, elem_id) -> Optional[Bookmark]:
        if cls.bookmarks is not None:
            if elem_id in cls.bookmarks:
                return cls.bookmarks.pop(elem_id)
            else:
                raise Exception(f"Could not remove element with id {id} from bookmarks")
        else:
            return None

    @classmethod
    def contains_bookmark(cls, elem_id: str) -> bool:
        return cls.bookmarks is not None and elem_id in cls.bookmarks

    @classmethod
    def store_bookmarks_in_default_out_dir(cls, index_file: UploadFile, gfa_hash: str) -> Path:
        bookmarks_file_path = f"../cli/cli/out/{gfa_hash}.bookmarks.json"
        os.makedirs(os.path.dirname(bookmarks_file_path), exist_ok=True)
        with open(bookmarks_file_path, "wb") as f:
            index_content = index_file.file.read()
            f.write(index_content)
        return Path(bookmarks_file_path)

    @classmethod
    def bookmarks_for_gfa_exists(cls, gfa_hash: str) -> Optional[Path]:
        path = Path(f"../cli/cli/out/{gfa_hash}.bookmarks.json")
        if path.exists():
            return path
        else:
            return None

    @classmethod
    def export(cls) -> Optional[Path]:
        gfa_hash = GfaManager.get_hash()
        if gfa_hash:
            file_path = JsonSerializer.serialize(
                cls.bookmarks, out_file=Path(f"../cli/cli/out/{gfa_hash}.bookmarks.json")
            )
            if isinstance(file_path, Path):
                cls.bookmarks_file_path = file_path
                return file_path
        return None

    @classmethod
    def load(cls) -> None:
        if cls.bookmarks_file_path:
            cls.bookmarks = JsonSerializer.deserialize(from_file=cls.bookmarks_file_path)
            FileManager.set_file_status(FileIndex.BOOKMARKS, FileStatus.READY)
            FileManager.get_file(FileIndex.BOOKMARKS).name = cls.bookmarks_file_path.name

    @classmethod
    def prepare(cls) -> None:
        gfa_hash = GfaManager.get_hash()
        if gfa_hash:
            file_path = cls.bookmarks_for_gfa_exists(gfa_hash)
            if file_path:
                cls.bookmarks_file_path = file_path
                cls.load()

    @classmethod
    def clear(cls) -> None:
        cls.bookmarks = None
        cls.bookmarks_file_path = None
