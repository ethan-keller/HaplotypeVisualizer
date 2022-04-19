import os
from pathlib import Path
from typing import Optional

from fastapi import UploadFile
from server.cli.gfa import Gfa
from server.cli.kdtree import KDTree
import shutil

from server.cli.layout import Layout


class LayoutManager:
    index: Optional[KDTree] = None

    @classmethod
    def get_index_from_layout(cls, layout: Layout) -> None:
        if layout:
            kdtree = KDTree.create_tree_from_layout(layout)
            cls.index = kdtree
        else:
            raise Exception("Cannot create index without layout")

    @classmethod
    def copy_layout_file_to_default_dir(cls, layout_file: Path, gfa_hash: str) -> None:
        if layout_file:
            try:
                shutil.copy(layout_file, f"./server/cli/out/{gfa_hash}.pickle")
            except shutil.SameFileError:
                return None

    @classmethod
    def store_layout_in_default_out_dir(cls, layout_file: UploadFile, gfa_hash: str) -> None:
        layout_file_path = f"./server/cli/out/{gfa_hash}.pickle"
        os.makedirs(os.path.dirname(layout_file_path), exist_ok=True)
        with open(layout_file_path, 'wb') as f:
            layout_content = layout_file.file.read()
            f.write(layout_content)


    @classmethod
    def layout_for_gfa_exists(cls, gfa_file_path: str) -> bool:
        hash_value = Gfa.get_gfa_hash(gfa_file_path)
        path = Path(f"./server/cli/out/{hash_value}.pickle")
        return path.exists()

    @classmethod
    def clear(cls) -> None:
        cls.index = None
