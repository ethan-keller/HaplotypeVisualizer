import json
from typing import Dict
from fastapi import APIRouter
from pydantic import Json
from schemas.layout import Layout
from subprocess import check_output

router = APIRouter(prefix="/layout", tags=["layout"])


@router.get("/", response_model=Layout, summary="Get node positions in layout")
def getLayoutPositions():
    """
    Executes the graph layout algorithm and returns the node positions.
    """
    positions = check_output(['npx', 'ts-node', './cytoscape.ts'], cwd='./graph_layout', shell=True)
    positions = json.loads(positions)

    return positions
