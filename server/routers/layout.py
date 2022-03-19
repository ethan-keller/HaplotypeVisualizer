from typing import List
from fastapi import APIRouter, HTTPException, status
from logic.layout import getLayoutAndBounds
from schemas.layout import Bounds, Density, Layout, LayoutAndBounds
from logic.density import get_density_values

from server_data.data import LayoutManager

router = APIRouter(prefix="/layout", tags=["layout"])


@router.put(
    "/",
    responses={
        status.HTTP_500_INTERNAL_SERVER_ERROR: {
            "description": "Could not compute layout and bound positions",
            "model": str,
        }
    },
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


@router.get(
    "/density",
    responses={
        status.HTTP_500_INTERNAL_SERVER_ERROR: {
            "description": "Could not compute densities because there is no bound information",
            "model": str,
        }
    },
    response_model=Density,
    summary="Get variation densities along with their x coordinates",
)
def getDensities():
    """
    Gets density values along with their respective x coordinates.
    """
    if not LayoutManager.bounds:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not compute densities because there is no bound information",
        )

    xs, densities = get_density_values(LayoutManager.bounds)

    return Density(xs=xs, densities=densities)


@router.get(
    "/bounds_ready", response_model=bool, summary="Checks if node layout bounds are computed",
)
def are_bounds_ready():
    """
    Returns True if the node layout bounds are computed. False otherwise
    """
    return LayoutManager.bounds is not None
