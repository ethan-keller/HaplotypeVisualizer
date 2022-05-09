from pydantic import parse_obj_as
import os
from pathlib import Path
from typing import Union
from subprocess import check_output
from cli.gfa import Gfa
from cli.schemas.layout import Layout as LayoutType
from cli.serialization import JsonSerializer


class Layout:
    def __init__(self, nodes: LayoutType) -> None:
        self.nodes = nodes

    @classmethod
    def get_layout_from_gfa_file(cls, gfa_path: Path) -> "Layout":
        return cls.compute_layout(gfa_path)

    @classmethod
    def get_layout_from_layout_file(cls, layout_path: Path) -> "Layout":
        return cls.deserialize(from_file=layout_path)

    @classmethod
    def compute_layout(cls, gfa_path: Path) -> "Layout":
        try:
            gfa_hash = Gfa.get_gfa_hash(gfa_path)
            if gfa_hash:
                gfa = Gfa.read_gfa_from_file(gfa_path)
                cwd = "./graph_layout"
                if Path(os.getcwd()).name == "server":
                    Gfa.serialize(gfa, out_file=Path(f"../cli/cli/out/{gfa_hash}.gfa.json"))
                    cwd = "../cli/cli/graph_layout"
                else:
                    Gfa.serialize(gfa, out_file=Path(f"out/{gfa_hash}.gfa.json"))
                out = check_output(
                    ["npx", "ts-node", "./cytoscape.ts", f"out/{gfa_hash}.gfa.json"], cwd=cwd, shell=True
                )
                return cls.deserialize(out)
            else:
                raise Exception("Could not compute gfa hash")
        except Exception as e:
            raise Exception(f"Could not compute layout: [{e}]")

    @classmethod
    def serialize(cls, layout: "Layout", out_file: Path = None) -> Union[bytes, Path]:
        return JsonSerializer.serialize(layout.nodes, out_file)

    @classmethod
    def deserialize(cls, sb: Union[str, bytes] = None, from_file: Path = None) -> "Layout":
        return cls(nodes=parse_obj_as(LayoutType, JsonSerializer.deserialize(sb, from_file)))
