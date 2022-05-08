import os
from pathlib import Path
from typing import List, Optional
from cli.layout import Layout
from fastapi import UploadFile
from cli.gfa import Gfa
from cli.kdtree import KDTree
from server.logic.density import get_density_values
from server.schemas.layout import Layout as LayoutType, LayoutNode, RectangleRange


class LayoutManager:
    index: Optional[KDTree] = None
    densities: Optional[List[int]] = None
    index_file_path: Optional[Path] = None

    @classmethod
    def get_densities(cls) -> List[int]:
        if cls.densities is not None:
            return cls.densities
        elif cls.index is not None:
            kdtree_nodes = cls.index.in_order_traversal()
            bounds = [node.bounds for node in set(kdtree_nodes)]
            cls.densities = get_density_values(bounds)
            return cls.densities
        else:
            return []

    @classmethod
    def get_all_layout_nodes_in_range(cls, range: RectangleRange) -> LayoutType:
        if cls.index is not None:
            kdtree_nodes = cls.index.range_query(range.lu, range.rd)
            return {
                node.segment_id: LayoutNode(segment_id=node.segment_id, position=node.position) for node in kdtree_nodes
            }
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
        with open(index_file_path, "wb") as f:
            index_content = index_file.file.read()
            f.write(index_content)
        return Path(index_file_path)

    @classmethod
    def index_for_gfa_exists(cls, gfa_file_path: Path) -> Optional[Path]:
        hash_value = Gfa.get_gfa_hash(gfa_file_path)
        path = Path(f"../cli/cli/out/{hash_value}.pickle")
        if path.exists():
            return path
        else:
            return None

    @classmethod
    def clear(cls) -> None:
        cls.index = None
        cls.densities = None
        cls.index_file_path = None
