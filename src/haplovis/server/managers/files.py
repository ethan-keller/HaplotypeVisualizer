import os
from pathlib import Path
from typing import List
from os.path import isfile, splitext

from haplovis.schemas.file import File, FileStatus, FileIndex
import haplovis.server.managers as managers
from haplovis.data_locations import server_data_location


class FileManager:
    # Server should be ran from root dir
    FILE_BASE_PATH = server_data_location
    files: List[File] = [
        File(id=0, description="GFA file", status=FileStatus.NO_FILE, required=True, file_extensions=[".gfa"]),
        File(id=1, description="Phenotype table", status=FileStatus.NO_FILE, required=False, file_extensions=[".csv"]),
        File(id=2, description="GFF file", status=FileStatus.NO_FILE, required=False, file_extensions=[".gff"]),
        File(id=3, description="Bookmarks file", status=FileStatus.NO_FILE, required=False, file_extensions=[".json"]),
    ]

    @classmethod
    def get_absolute_file_path(cls, id: int) -> Path:
        return cls.FILE_BASE_PATH.joinpath(cls.get_file(id).name)

    @classmethod
    def _does_file_have_status(cls, id: int, status: FileStatus) -> bool:
        return cls.get_file(id).status == status

    @classmethod
    def is_file_empty(cls, id: int) -> bool:
        return cls._does_file_have_status(id, FileStatus.NO_FILE)

    @classmethod
    def is_file_invalid(cls, id: int) -> bool:
        return cls._does_file_have_status(id, FileStatus.INVALID)

    @classmethod
    def does_file_need_preprocessing(cls, id: int) -> bool:
        return cls._does_file_have_status(id, FileStatus.NEEDS_PRE_PROCESSING)

    @classmethod
    def is_file_preprocessing(cls, id: int) -> bool:
        return cls._does_file_have_status(id, FileStatus.PRE_PROCESSING)

    @classmethod
    def set_file_status(cls, id: int, status: FileStatus) -> None:
        cls.get_file(id).status = status

    @classmethod
    def get_file(cls, id: int) -> File:
        if cls.is_valid_id(id):
            return cls.files[id]
        else:
            raise Exception("Cannot get file with invalid file id: {id}")

    @classmethod
    def validate(cls, file_path: Path, id: int) -> bool:
        if not cls.is_valid_id(id):
            raise Exception(f"Invalid file id: {id}")
        if not cls.is_valid_file_extension(file_path, id):
            raise Exception(f"[{file_path}] has an invalid file extension")
        if not cls.file_exists(file_path):
            raise Exception(f"File at path: [{file_path}] does not exist")

        return True

    @classmethod
    def is_valid_id(cls, id: int) -> bool:
        return id >= 0 and id < len(cls.files)

    @classmethod
    def is_valid_file_extension(cls, path: Path, id: int) -> bool:
        valid_extensions = cls.files[id].file_extensions
        file_extension = cls.get_file_extension(path)

        return file_extension in valid_extensions

    @classmethod
    def are_required_files_ready_for_visualization(cls) -> bool:
        for i, file in enumerate(cls.files):
            if file.required and not cls._does_file_have_status(i, FileStatus.READY):
                return False
        return True

    @classmethod
    def file_exists(cls, path: Path) -> bool:
        return isfile(path)

    @classmethod
    def get_file_extension(cls, path: Path) -> str:
        _, extension = splitext(path)
        return extension

    @classmethod
    def prepare_files(cls) -> None:
        if managers.GfaManager.segment_map is None:
            managers.GfaManager.prepare_gfa()
        if managers.LayoutManager.index is None:
            managers.LayoutManager.prepare_layout()
        if managers.PhenoManager.phenotypes is None:
            managers.PhenoManager.prepare_pheno()
        if managers.BookmarkManager.bookmarks is None:
            managers.BookmarkManager.prepare()

    @classmethod
    def clear_file(cls, id: int) -> None:
        if cls.is_valid_id(id):
            file = cls.get_file(id)
            file.name = ""
            file.status = FileStatus.NO_FILE
            if id == FileIndex.GFA:
                managers.GfaManager.clear()
                managers.LayoutManager.clear()
                managers.BookmarkManager.clear()
            elif id == FileIndex.PHENO:
                managers.PhenoManager.clear()
            elif id == FileIndex.BOOKMARKS:
                managers.BookmarkManager.clear()
        else:
            raise Exception(f"Cannot clear file because of invalid index: {id}")
