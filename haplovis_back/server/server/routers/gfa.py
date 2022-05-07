from typing import Any, Dict, List, Union
from cli.serialization import JsonSerializer

from fastapi import APIRouter, Response, status
from fastapi.exceptions import HTTPException
from server.managers import GfaManager
from cli.schemas.gfa import Gfa, GfaSegment, GfaLink, GfaPath, GfaInfo


router = APIRouter(prefix="/gfa", tags=["gfa"])

responses: Dict[Union[int, str], Dict[str, Any]] = {
    status.HTTP_400_BAD_REQUEST: {"description": "Could not find a gfa object", "model": str}
}


@router.put(
    "/segments",
    response_model=List[GfaSegment],
    responses=responses,
    summary="Gets the GFA segments",
)
async def get_segments(segment_ids: List[str]):
    """
    Gets the segments from the GFA object.
    """
    if GfaManager.segment_map is not None:
        print("getting segments")
        s = GfaManager.get_segments_from_ids(segment_ids)
        print("Got segments")
        return Response(JsonSerializer.serialize(s))
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Could not retrieve segments from a non-existent gfa object"
        )


@router.get("/segment", response_model=GfaSegment, summary="Gets a gfa segment")
async def get_segment(segment_id: str):
    if GfaManager.segment_map is not None:
        return GfaManager.get_segment_from_id(segment_id)
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Could not retrieve segment from a non-existent gfa object"
        )


@router.put(
    "/links",
    response_model=List[GfaLink],
    responses=responses,
    summary="Gets the GFA links",
)
async def get_links(segment_ids: List[str]):
    """
    Gets the links from the GFA object.
    """
    if GfaManager.link_map is not None:
        print("getting links")
        s = GfaManager.get_links_from_segments(segment_ids)
        print("Got links")
        return Response(JsonSerializer.serialize(s))
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Could not retrieve links from a non-existent gfa object"
        )


@router.get("/link", response_model=GfaLink, summary="Gets a gfa link")
async def get_link(link_id: str):
    if GfaManager.link_map is not None:
        return GfaManager.get_link_from_link_id(link_id)
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Could not retrieve segment from a non-existent gfa object"
        )


@router.get(
    "/paths",
    response_model=Dict[str, GfaPath],
    responses=responses,
    summary="Gets the GFA paths",
)
async def get_paths():
    """
    Gets the paths from the GFA object.
    """
    if GfaManager.path_map is not None:
        print("Getting paths")
        s = GfaManager.path_map
        print("Got paths")
        return Response(JsonSerializer.serialize(s))
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Could not retrieve paths from a non-existent gfa object"
        )


@router.put(
    "/paths",
    response_model=Dict[str, GfaPath],
    responses=responses,
    summary="Gets the GFA paths by their name",
)
async def get_paths_by_name(names: List[str]):
    """
    Gets the paths from the GFA object by name.
    """
    if GfaManager.path_map is not None:
        return Response(JsonSerializer.serialize(GfaManager.get_paths_by_name(names)))
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Could not retrieve paths from a non-existent gfa object"
        )


@router.get("/gfa_info", response_model=GfaInfo, responses=responses, summary="Gets graph information")
async def get_graph_info():
    """
    Gets graph information.
    """
    if GfaManager.segment_map is not None and GfaManager.link_map is not None and GfaManager.path_map is not None:
        return GfaInfo(
            n_segments=len(GfaManager.segment_map.values()),
            n_links=len(GfaManager.get_all_links()),
            n_paths=len(GfaManager.path_map.values()),
        )
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Could not retrieve paths from a non-existent gfa object"
        )


@router.get("/segment_lengths", response_model=List[int], responses=responses, summary="Gets segment lengths")
async def get_segment_lengths():
    """
    For the visualization of segment lengths, this endpoint returns the segment lengths.
    """
    if GfaManager.segment_map is not None:
        segment_lengths = list(
            map(
                lambda segment: segment.get_length(),
                GfaManager.segment_map.values(),
            )
        )
        return segment_lengths
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could compute histogram values from a non-existent gfa object",
        )
