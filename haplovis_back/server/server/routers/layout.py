from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import Json
from server.schemas.layout import Layout, Position, RectangleRange
from server.logic.density import get_down_sample_factor

from server.managers import LayoutManager

router = APIRouter(prefix="/layout", tags=["layout"])


async def get_range(range: Json = Query(...)) -> RectangleRange:
    try:
        viewport = RectangleRange.parse_obj(range)
        # swap y axis (js coordinate system)
        rangeLu = Position(x=viewport.lu.x, y=viewport.rd.y)
        rangeRd = Position(x=viewport.rd.x, y=viewport.lu.y)
        return RectangleRange(lu=rangeLu, rd=rangeRd)
    except Exception as e:
        raise Exception(f"Could create rectangle range for range query: [{e}]")


@router.get(
    "/range",
    response_model=Layout,
    summary="Gets all nodes in given range",
)
async def get_all_layout_nodes_in_range(range: RectangleRange = Depends(get_range)):
    """
    Gets all layout nodes from the index inside the given range.
    """
    # TODO: validate range
    if LayoutManager.index is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not get nodes because there is no index available",
        )
    else:
        print("Get layout")
        s = LayoutManager.get_all_layout_nodes_in_range(range)
        print("Got layout")
        return s


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
async def get_densities(down_sample_factor: Optional[int] = None):
    """
    Gets density values along with their respective x coordinates.
    """
    print("Get density")
    if LayoutManager.index is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not compute densities because there is no bound information",
        )

    densities = LayoutManager.get_densities()
    f = down_sample_factor if down_sample_factor is not None else get_down_sample_factor(len(densities))
    print("Got density")
    return densities[::f]
