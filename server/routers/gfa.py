from typing import Any, Dict, List, Union

from fastapi import APIRouter, status
from fastapi.exceptions import HTTPException
from schemas.gfa import Gfa, GfaLink, GfaPath, GfaSegment
from server_data.data import GfaManager

router = APIRouter(prefix="/gfa", tags=["gfa"])

responses: Dict[Union[int, str], Dict[str, Any]] = {
    status.HTTP_400_BAD_REQUEST: {"description": "Could not find a gfa object", "model": str}
}


@router.get("/", response_model=Gfa, responses=responses, summary="Gets the full GFA object")
def getGfa():
    """
    Gets the full GFA object.
    """
    if GfaManager.gfa:
        return GfaManager.gfa
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not find a gfa object")


@router.get(
    "/segments", response_model=List[GfaSegment], responses=responses, summary="Gets the GFA segments",
)
def getSegments():
    """
    Gets the segments from the GFA object.
    """
    if GfaManager.gfa:
        return GfaManager.gfa.segments
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Could not retrieve segments from a non-existent gfa object"
        )


@router.get(
    "/links", response_model=List[GfaLink], responses=responses, summary="Gets the GFA links",
)
def getLinks():
    """
    Gets the links from the GFA object.
    """
    if GfaManager.gfa:
        return GfaManager.gfa.links
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Could not retrieve links from a non-existent gfa object"
        )


@router.get(
    "/paths", response_model=List[GfaPath], responses=responses, summary="Gets the GFA paths",
)
def getPaths():
    """
    Gets the paths from the GFA object.
    """
    if GfaManager.gfa:
        return GfaManager.gfa.paths
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Could not retrieve paths from a non-existent gfa object"
        )
