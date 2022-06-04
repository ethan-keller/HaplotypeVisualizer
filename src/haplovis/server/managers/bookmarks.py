import os
from pathlib import Path
from typing import Dict, Optional
from fastapi import UploadFile
from haplovis.serialization import JsonSerializer
from haplovis.server.managers.files import FileManager
from haplovis.server.managers.gfa import GfaManager
from haplovis.schemas.bookmark import Bookmark
from haplovis.schemas.file import FileIndex, FileStatus


class BookmarkManager:
    bookmarks: Optional[Dict[str, Bookmark]] = None

    @classmethod
    def add_bookmark(cls, bookmark: Bookmark) -> None:
        if cls.bookmarks is not None:
            cls.bookmarks[bookmark.elem_id] = bookmark

    @classmethod
    def remove_bookmark(cls, elem_id) -> Optional[Bookmark]:
        if cls.bookmarks is not None:
            if elem_id in cls.bookmarks:
                return cls.bookmarks.pop(elem_id)
            else:
                raise Exception(f"Could not remove element with id {elem_id} from bookmarks")
        else:
            return None

    @classmethod
    def contains_bookmark(cls, elem_id: str) -> bool:
        return cls.bookmarks is not None and elem_id in cls.bookmarks

    @classmethod
    def store_bookmarks_in_default_out_dir(cls, index_file: UploadFile, gfa_hash: str) -> Path:
        bookmarks_file_path = FileManager.output_folder.joinpath(Path(f"{gfa_hash}.bookmarks.json"))
        os.makedirs(os.path.dirname(bookmarks_file_path), exist_ok=True)
        with open(bookmarks_file_path, "wb") as f:
            index_content = index_file.file.read()
            f.write(index_content)
        return Path(bookmarks_file_path)

    @classmethod
    def bookmarks_for_gfa_exists(cls, gfa_hash: str) -> Optional[Path]:
        path = FileManager.output_folder.joinpath(Path(f"{gfa_hash}.bookmarks.json"))
        if path.exists():
            return path
        else:
            return None

    @classmethod
    def export(cls) -> Optional[Path]:
        gfa_hash = GfaManager.get_hash()
        if gfa_hash:
            bookmarks_file = FileManager.output_folder.joinpath(Path(f"{gfa_hash}.bookmarks.json"))
            file_path = JsonSerializer.serialize(
                cls.bookmarks, out_file=bookmarks_file
            )
            if isinstance(file_path, Path):
                FileManager.set_file_status(FileIndex.BOOKMARKS, FileStatus.READY)
                FileManager.get_file(FileIndex.BOOKMARKS).name = file_path.name
                return file_path
        return None

    @classmethod
    def load(cls, file_path: Optional[Path] = None) -> None:
        if file_path is not None:
            cls.bookmarks = JsonSerializer.deserialize(from_file=file_path)
            FileManager.set_file_status(FileIndex.BOOKMARKS, FileStatus.READY)
            FileManager.get_file(FileIndex.BOOKMARKS).name = file_path.name
        else:
            cls.bookmarks = {}

    @classmethod
    def prepare(cls) -> None:
        gfa_hash = GfaManager.get_hash()
        if gfa_hash:
            file_path = cls.bookmarks_for_gfa_exists(gfa_hash)
            cls.load(file_path)

    @classmethod
    def clear(cls) -> None:
        cls.bookmarks = None
