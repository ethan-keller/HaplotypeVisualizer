import os
from subprocess import check_output, CalledProcessError
from asyncio.subprocess import STDOUT
from pathlib import Path
from typing import List, Optional
from haplovis.layout import Layout
from fastapi import UploadFile
from haplovis.gfa import Gfa
from haplovis.kdtree import KDTree
from haplovis.server.logic.density import get_density_values
from haplovis.schemas.layout import Layout as LayoutType, LayoutNode, RectangleRange
from haplovis.server.managers.files import FileManager


class LayoutManager:
    index: Optional[KDTree] = None
    densities: Optional[List[int]] = None
    index_file_path: Optional[Path] = None

    @classmethod
    def get_layout_from_gfa_file(cls, gfa_path: Path, custom_output_location: Optional[Path] = None) -> "Layout":
        return cls.compute_layout(gfa_path, custom_output_location)

    @classmethod
    def compute_layout(cls, gfa_path: Path, custom_output_location: Optional[Path] = None) -> "Layout":
        try:
            gfa_hash = Gfa.get_gfa_hash(gfa_path)
            if gfa_hash:
                gfa = Gfa.read_gfa_from_file(gfa_path)
                out_loc = FileManager.output_folder
                if custom_output_location:
                    out_loc = custom_output_location
                gfa_json_path = out_loc.joinpath(Path(f"{gfa_hash}.gfa.json"))
                Gfa.serialize(gfa, out_file=gfa_json_path)
                cwd = "./graph_layout"
                if Path(os.getcwd()).name == "HaplotypeVisualizer":
                    cwd = "./src/haplovis/graph_layout"
                try:
                    out = check_output(
                        [
                            "node",
                            "-r",
                            "ts-node/register",
                            "./cytoscape.ts",
                            str(gfa_json_path),
                        ],
                        cwd=cwd,
                        shell=True,
                        stderr=STDOUT,
                    )
                except CalledProcessError as e:
                    raise RuntimeError(
                        "command '{}' returned with error (code {}): {}".format(e.cmd, e.returncode, e.output)
                    )
                return cls.deserialize(out)
            else:
                raise Exception("Could not compute gfa hash")
        except Exception as e:
            raise Exception(f"Could not compute layout: [{e}]")

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
    def is_range_valid(cls, range: RectangleRange) -> bool:
        return range.lu.x < range.rd.x and range.lu.y > range.rd.y

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
            cls.index = KDTree.deserialize(from_file=cls.index_file_path)
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
        index_file_path = FileManager.output_folder.joinpath(Path(f"{gfa_hash}.pickle"))
        os.makedirs(os.path.dirname(index_file_path), exist_ok=True)
        with open(index_file_path, "wb") as f:
            index_content = index_file.file.read()
            f.write(index_content)
        return Path(index_file_path)

    @classmethod
    def index_for_gfa_exists(cls, gfa_file_path: Path) -> Optional[Path]:
        gfa_hash = Gfa.get_gfa_hash(gfa_file_path)
        path = FileManager.output_folder.joinpath(Path(f"{gfa_hash}.pickle"))
        if path.exists():
            return path
        else:
            return None

    @classmethod
    def clear(cls) -> None:
        cls.index = None
        cls.densities = None
        cls.index_file_path = None
