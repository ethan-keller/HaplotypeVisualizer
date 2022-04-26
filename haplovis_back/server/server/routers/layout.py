from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import Json
from server.schemas.layout import Density, Layout, Position, RectangleRange
from server.logic.density import get_density_values

from server.managers import LayoutManager

router = APIRouter(prefix="/layout", tags=["layout"])


@router.get(
    "/",
    response_model=Layout,
    summary="Gets all nodes",
)
def get_all_layout_nodes():
    """
    Gets all layout nodes from the index. # TODO: Containing bounds
    """
    if LayoutManager.is_index_empty():
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not get nodes because there is no index available",
        )
    else:
        return LayoutManager.get_all_layout_nodes()

def get_range(range: Json[Any] = Query(...)) -> RectangleRange:
    try:
        viewport = RectangleRange.parse_obj(range)
        # swap y axis (js coordinate system)
        rangeLu = Position(x=viewport.lu.x, y=viewport.rd.y)
        rangeRd = Position(x=viewport.rd.x, y=viewport.lu.y)
        return RectangleRange(lu=rangeLu, rd=rangeRd)
    except Exception as e:
        print(e)

@router.get(
    "/range",
    response_model=Layout,
    summary="Gets all nodes in given range",
)
def get_all_layout_nodes_in_range(range: RectangleRange = Depends(get_range)):
    """
    Gets all layout nodes from the index inside the given range. # TODO: Containing bounds
    """
    # TODO: validate range
    if LayoutManager.is_index_empty():
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not get nodes because there is no index available",
        )
    else:
        return LayoutManager.get_all_layout_nodes_in_range(range)


@router.get(
    "/density",
    responses={
        status.HTTP_500_INTERNAL_SERVER_ERROR: {
            "description": "Could not compute densities because there is no bound information",
            "model": str,
        }
    },
    response_model=List[int],
    summary="Get variation densities along with their x coordinates",
)
def getDensities():
    """
    Gets density values along with their respective x coordinates.
    """
    if LayoutManager.is_index_empty():
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not compute densities because there is no bound information",
        )

    densities = get_density_values(LayoutManager.get_all_bounds())

    return densities

