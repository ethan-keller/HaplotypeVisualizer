from typing import List
from fastapi import APIRouter, HTTPException
from schemas.layout import Layout
from schemas.layout import LayoutAndBounds
from fastapi import status
from logic.layout import getLayoutAndBounds
from schemas.layout import Bounds

from server_data.data import LayoutManager

router = APIRouter(prefix="/layout", tags=["layout"])


@router.put(
    "/",
    responses={status.HTTP_500_INTERNAL_SERVER_ERROR: {"description": "Could not compute layout and bound positions", "model": str}},
    summary="Prepare layout and bound coordinates",
)
def prepareLayout():
    """
    Executes the graph layout algorithm and memoizes layout and bound information.
    """
    if LayoutManager.layout and LayoutManager.bounds:
        return

    try:
        layout_and_bounds: LayoutAndBounds = getLayoutAndBounds()
    except:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Could not compute layout and bound positions",
        )

    LayoutManager.layout = layout_and_bounds.layout
    LayoutManager.bounds = layout_and_bounds.bounds


@router.get("/positions", response_model=Layout, summary="Get layout node positions")
def getNodePositions():
    """
    Gets layout node positions.
    """
    if LayoutManager.layout:
        return LayoutManager.layout

    prepareLayout()
    return LayoutManager.layout


@router.get("/bounds", response_model=List[Bounds], summary="Get layout node bounding box boundaries")
def getNodeBounds():
    """
    Gets layout node bounding box boundaries.
    """
    if LayoutManager.bounds:
        return LayoutManager.bounds

    prepareLayout()
    return LayoutManager.bounds

