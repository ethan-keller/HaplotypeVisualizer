from typing import Optional
from subprocess import check_output
import json

from schemas.layout import Bounds, Layout, LayoutAndBounds


class LayoutManager:
    layout: Optional[Layout] = None
    bounds: Optional[Bounds] = None

    @classmethod
    def getLayoutAndBounds(cls) -> LayoutAndBounds:
        try:
            out = check_output(["npx", "ts-node", "./cytoscape.ts"], cwd="./graph_layout", shell=True)
            json_out = json.loads(out)
            layout_and_bounds = LayoutAndBounds(**json_out)
        except:
            raise Exception("Could not compute layout and bound positions")

        return layout_and_bounds
