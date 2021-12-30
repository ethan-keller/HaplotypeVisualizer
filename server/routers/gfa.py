from fastapi import APIRouter, status
from fastapi import status
from fastapi.exceptions import HTTPException
from server_data.data import gfa
from schemas.gfa import Gfa


router = APIRouter(prefix="/gfa", tags=["gfa"])


@router.get(
    "/",
    response_model=Gfa,
    responses={status.HTTP_404_NOT_FOUND: {"description": "The requested GFA object has not been found", "model": str}},
    summary="Gets the GFA object",
)
def getGfa():
    """
    Gets the GFA object if it has successfully been parsed from the GFA file.
    """
    if not gfa:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="The requested GFA object has not been found")
    return gfa

