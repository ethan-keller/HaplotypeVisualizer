from asyncio.subprocess import STDOUT
from pydantic import parse_obj_as
import os
from pathlib import Path
from typing import Union
from subprocess import check_output, CalledProcessError
from haplovis.gfa import Gfa
from haplovis.schemas.layout import LayoutCLI as LayoutType
from haplovis.serialization import JsonSerializer

class Layout:
    def __init__(self, nodes: LayoutType) -> None:
        self.nodes = nodes

    @classmethod
    def get_layout_from_layout_file(cls, layout_path: Path) -> "Layout":
        return cls.deserialize(from_file=layout_path)

    @classmethod
    def compute_layout(cls, gfa_path: Path, output_location: Path) -> "Layout":
        try:
            gfa_hash = Gfa.get_gfa_hash(gfa_path)
            if gfa_hash:
                gfa = Gfa.read_gfa_from_file(gfa_path)
                gfa_json_path = output_location.joinpath(Path(f"{gfa_hash}.gfa.json"))
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
    def serialize(cls, layout: "Layout", out_file: Path = None) -> Union[bytes, Path]:
        return JsonSerializer.serialize(layout.nodes, out_file)

    @classmethod
    def deserialize(cls, sb: Union[str, bytes] = None, from_file: Path = None) -> "Layout":
        return cls(nodes=parse_obj_as(LayoutType, JsonSerializer.deserialize(sb, from_file)))
