import os
from pathlib import Path
from typing import List, Optional
from fastapi import UploadFile
from cli.gfa import Gfa
from cli.kdtree import KDTree
from server.schemas.layout import Layout, Position, RectangleRange, Bounds


class LayoutManager:
    index: Optional[KDTree] = None
    layout: Layout = None
    bounds: List[Bounds] = None
    index_file_path: Path = None

    @classmethod
    def is_index_empty(cls) -> bool:
        return cls.index is None

    @classmethod
    def is_layout_empty(cls) -> bool:
        return cls.layout is None

    @classmethod
    def is_bounds_empty(cls) -> bool:
        return cls.bounds is None

    @classmethod
    def get_all_bounds(cls) -> List[Bounds]:
        if not cls.is_bounds_empty():
            return cls.bounds
        elif not cls.is_index_empty():
            kdtree_nodes = cls.index.in_order_traversal()
            cls.bounds = [Bounds(xl=node.bounds.xl, xr=node.bounds.xr) for node in set(kdtree_nodes)]
            return cls.bounds
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
        if cls.index_file_path:
            print("deserializing index")
            cls.index = KDTree.deserialize(from_file=cls.index_file_path)
            print("Done deserializing index")
        else:
            raise Exception("Could not retrieve layout file because layout file location is unknown")

    @classmethod
    def get_index_from_layout(cls, layout: Layout) -> KDTree:
        if layout:
            return KDTree.create_tree_from_layout(layout)
        else:
            raise Exception("Cannot create index without layout")

    @classmethod
    def store_index_in_default_out_dir(cls, index_file: UploadFile, gfa_hash: str) -> Path:
        index_file_path = f"../cli/cli/out/{gfa_hash}.pickle"
        os.makedirs(os.path.dirname(index_file_path), exist_ok=True)
        with open(index_file_path, 'wb') as f:
            index_content = index_file.file.read()
            f.write(index_content)
        return Path(index_file_path)


    @classmethod
    def index_for_gfa_exists(cls, gfa_file_path: str) -> Optional[Path]:
        hash_value = Gfa.get_gfa_hash(gfa_file_path)
        path = Path(f"../cli/cli/out/{hash_value}.pickle")
        if path.exists():
            return path
        else:
            return None

    @classmethod
    def clear(cls) -> None:
        cls.index = None
        cls.layout = None
        cls.bounds = None
        cls.index_file_path = None
