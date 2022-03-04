from typing import Any, Dict, List, Union

from fastapi import APIRouter, status
from fastapi.exceptions import HTTPException
from schemas.gfa import Gfa, GfaLink, GfaPath, GfaSegment, GfaInfo
from server_data.data import DataManager

router = APIRouter(prefix="/gfa", tags=["gfa"])

responses: Dict[Union[int, str], Dict[str, Any]] = {
    status.HTTP_400_BAD_REQUEST: {"description": "Could not find a gfa object", "model": str}
}


@router.get("/", response_model=Gfa, responses=responses, summary="Gets the full GFA object")
def get_gfa():
    """
    Gets the full GFA object.
    """
    if DataManager.gfa:
        return DataManager.gfa
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not find a gfa object")


@router.get(
    "/segments", response_model=List[GfaSegment], responses=responses, summary="Gets the GFA segments",
)
def get_segments():
    """
    Gets the segments from the GFA object.
    """
    if DataManager.gfa:
        return DataManager.gfa.segments
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Could not retrieve segments from a non-existent gfa object"
        )


@router.get(
    "/links", response_model=List[GfaLink], responses=responses, summary="Gets the GFA links",
)
def get_links():
    """
    Gets the links from the GFA object.
    """
    if DataManager.gfa:
        return DataManager.gfa.links
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Could not retrieve links from a non-existent gfa object"
        )


@router.get(
    "/paths", response_model=List[GfaPath], responses=responses, summary="Gets the GFA paths",
)
def get_paths():
    """
    Gets the paths from the GFA object.
    """
    if DataManager.gfa:
        return DataManager.gfa.paths
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Could not retrieve paths from a non-existent gfa object"
        )


@router.get("/gfa_info", response_model=GfaInfo, responses=responses, summary="Gets graph information")
def get_graph_info():
    """
    Gets graph information.
    """
    if DataManager.gfa:
        g = DataManager.gfa
        return GfaInfo(n_segments=len(g.segments), n_links=len(g.links), n_paths=len(g.paths))
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Could not retrieve paths from a non-existent gfa object"
        )
