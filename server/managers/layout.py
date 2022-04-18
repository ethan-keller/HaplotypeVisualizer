import os
from pathlib import Path
from typing import Dict, List, Optional, Tuple
from server.cli.schemas.layout import Bounds, Position
from server.cli.layout import Layout
from server.cli.gfa import Gfa


class LayoutManager:
    layout: Optional[Dict[str, Tuple[Position, Bounds]]] = None

    # @classmethod
    # def get_layout(cls) -> Dict[str, Tuple[Position, Bounds]]:
    #     try:
    #         if cls.layout:
    #             layout = cls.layout
    #     except:
    #         raise Exception("Could not compute layout and bound positions")

    #     return layout


    @classmethod
    def layout_for_gfa_exists(cls, gfa_file_path: str) -> bool:
        hash_value = Gfa.get_gfa_hash(gfa_file_path)
        path = Path(f"./server/cli/out/{hash_value}.pickle")
        return path.exists()

    @classmethod
    def clear(cls) -> None:
        cls.layout = None
        # cls.layout_hashes = []
