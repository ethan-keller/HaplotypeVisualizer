import json
from fastapi import APIRouter
from schemas.layout import Layout
from subprocess import check_output

from server_data.data import LayoutManager

router = APIRouter(prefix="/layout", tags=["layout"])


@router.get("/", response_model=Layout, summary="Get node positions in layout")
def getLayoutPositions():
    """
    Executes the graph layout algorithm and returns the node positions.
    """
    if LayoutManager.layout:
        return LayoutManager.layout

    positions = check_output(["npx", "ts-node", "./cytoscape.ts"], cwd="./graph_layout", shell=True)
    positions: Layout = json.loads(positions)

    LayoutManager.layout = positions

    return positions
