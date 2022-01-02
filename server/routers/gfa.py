from typing import Any, Dict, List, Union
from fastapi import APIRouter, status
from fastapi import status
from fastapi.exceptions import HTTPException
import logic.gfa as GfaLogic
from errors.PydanticConversionError import PydanticConversionError
from schemas.gfa import GfaSegment
from schemas.gfa import GfaLink, GfaPath
from server_data.data import GfaManager


router = APIRouter(prefix="/gfa", tags=["gfa"])

responses: Dict[Union[int, str], Dict[str, Any]] = {status.HTTP_500_INTERNAL_SERVER_ERROR: {"description": "Pydantic conversion went wrong", "model": str}}


@router.get(
    "/segments", response_model=List[GfaSegment], responses=responses, summary="Gets the GFA segments",
)
def getSegments():
    """
    Gets the segments from the GFA object.
    """
    try:
        return GfaLogic.convert_segments_to_pydantic(GfaManager.gfa.segments)
    except PydanticConversionError:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Pydantic conversion went wrong")


@router.get(
    "/links", response_model=List[GfaLink], responses=responses, summary="Gets the GFA links",
)
def getLinks():
    """
    Gets the links from the GFA object.
    """
    try:
        return GfaLogic.convert_links_to_pydantic(GfaManager.gfa.dovetails)
    except PydanticConversionError:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Pydantic conversion went wrong")


@router.get(
    "/paths", response_model=List[GfaPath], responses=responses, summary="Gets the GFA paths",
)
def getPaths():
    """
    Gets the paths from the GFA object.
    """
    try:
        return GfaLogic.convert_paths_to_pydantic(GfaManager.gfa.paths)
    except PydanticConversionError:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Pydantic conversion went wrong")

