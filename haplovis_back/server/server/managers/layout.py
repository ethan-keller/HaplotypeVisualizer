import os
import shutil
from pathlib import Path
from typing import List, Optional
from fastapi import UploadFile
from cli.gfa import Gfa
from cli.kdtree import KDTree
from cli.layout import Layout
from server.schemas.layout import Layout, Position, RectangleRange, Bounds


class LayoutManager:
    index: Optional[KDTree] = None
    layout_file_path: Path = None

    @classmethod
    def is_index_empty(cls) -> bool:
        return cls.index is None

    @classmethod
    def get_all_layout_nodes(cls) -> Layout:
        if cls.index is not None:
            kdtree_nodes = cls.index.in_order_traversal()
            return { node.segment : Position(x=node.x, y=node.y) for node in kdtree_nodes }
        else:
            return {}

    @classmethod
    def get_all_bounds(cls) -> List[Bounds]:
        if cls.index is not None:
            kdtree_nodes = cls.index.in_order_traversal()
            return [Bounds(xl=node.bounds.xl, xr=node.bounds.xr) for node in set(kdtree_nodes)]
        else:
            return []

    @classmethod
    def get_all_layout_nodes_in_range(cls, range: RectangleRange) -> Layout:
        if cls.index is not None:
            kdtree_nodes = cls.index.range_query(Position(x=range.lu.x, y=range.lu.y), Position(x=range.rd.x, y=range.rd.y))
            return { node.segment : Position(x=node.x, y=node.y) for node in kdtree_nodes }
        else:
            return {}


    @classmethod
    def prepare_layout(cls) -> None:
        if cls.layout_file_path:
            print("deserializing layout")
            cls.index = KDTree.deserialize(from_file=cls.layout_file_path)
            print("Done deserializing layout")
        else:
            raise Exception("Could not retrieve layout file because layout file location is unknown")

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
                shutil.copy(layout_file, f"../cli/cli/out/{gfa_hash}.pickle")
            except shutil.SameFileError:
                return None

    @classmethod
    def store_layout_in_default_out_dir(cls, layout_file: UploadFile, gfa_hash: str) -> Path:
        layout_file_path = f"../cli/cli/out/{gfa_hash}.pickle"
        os.makedirs(os.path.dirname(layout_file_path), exist_ok=True)
        with open(layout_file_path, 'wb') as f:
            layout_content = layout_file.file.read()
            f.write(layout_content)
        return Path(layout_file_path)


    @classmethod
    def layout_for_gfa_exists(cls, gfa_file_path: str) -> Optional[Path]:
        hash_value = Gfa.get_gfa_hash(gfa_file_path)
        path = Path(f"../cli/cli/out/{hash_value}.pickle")
        if path.exists():
            return path
        else:
            return None

    @classmethod
    def clear(cls) -> None:
        cls.index = None
        cls.layout_file_path = None
