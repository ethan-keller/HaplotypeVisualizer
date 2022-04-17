from typing import Any, Dict, List, Union

from fastapi import APIRouter, status
from fastapi.exceptions import HTTPException
from managers import GfaManager
from cli.schemas.gfa import Gfa, GfaSegment, GfaLink, GfaPath, GfaHist, GfaInfo
from utils.plots import compute_histogram


router = APIRouter(prefix="/gfa", tags=["gfa"])

responses: Dict[Union[int, str], Dict[str, Any]] = {
    status.HTTP_400_BAD_REQUEST: {"description": "Could not find a gfa object", "model": str}
}


@router.get("/", response_model=Gfa, responses=responses, summary="Gets the full GFA object")
def get_gfa():
    """
    Gets the full GFA object.
    """
    if not GfaManager.is_empty():
        return GfaManager.gfa
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not find a gfa object")


@router.get(
    "/segments", response_model=List[GfaSegment], responses=responses, summary="Gets the GFA segments",
)
def get_segments():
    """
    Gets the segments from the GFA object.
    """
    if not GfaManager.is_empty():
        return GfaManager.gfa.segments
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
    if not GfaManager.is_empty():
        return GfaManager.gfa.links
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
    if not GfaManager.is_empty():
        return GfaManager.gfa.paths
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Could not retrieve paths from a non-existent gfa object"
        )


@router.get("/gfa_info", response_model=GfaInfo, responses=responses, summary="Gets graph information")
def get_graph_info():
    """
    Gets graph information.
    """
    if not GfaManager.is_empty():
        g = GfaManager.gfa
        return GfaInfo(n_segments=len(g.segments), n_links=len(g.links), n_paths=len(g.paths))
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Could not retrieve paths from a non-existent gfa object"
        )


@router.get("/gfa_hist", response_model=GfaHist, responses=responses, summary="Gets segment length histogram values")
def get_hist_values():
    """
    For the visualization of segment lengths, this endpoint returns the computed histogram values.
    """
    if not GfaManager.is_empty():
        segment_lengths = list(
            map(
                lambda segment: segment.optionals["LN"] if segment.optionals else len(segment.sequence),
                GfaManager.gfa.segments,
            )
        )
        return compute_histogram(segment_lengths)
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could compute histogram values from a non-existent gfa object",
        )

