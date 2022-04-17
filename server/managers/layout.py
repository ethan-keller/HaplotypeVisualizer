from pathlib import Path
from typing import Dict, List, Optional, Tuple
from cli.schemas.layout import Bounds, Position
from cli.layout import Layout
from cli.gfa import Gfa


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
        path = Path(f"out/{hash_value}.json")
        return path.exists()

    @classmethod
    def clear(cls) -> None:
        cls.layout = None
        # cls.layout_hashes = []
