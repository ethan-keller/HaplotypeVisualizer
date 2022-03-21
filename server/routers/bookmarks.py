from typing import Dict
from fastapi import APIRouter, Query, HTTPException, status

from schemas.bookmark import Bookmark
from server_data.data import BookmarkManager


router = APIRouter(prefix="/bookmarks", tags=["bookmarks"])


@router.get("/", response_model=Dict[str, Bookmark], summary="Get all bookmarks")
def getFiles():
    """
    Get all bookmarks.
    """
    return BookmarkManager.bookmarks


@router.delete("/", summary="remove a bookmark")
def removeBookmark(elem_id: str):
    """
    Remove a bookmark given the element's id.

    **elem_id**: Id of bookmarked element
    """
    if elem_id in BookmarkManager.bookmarks:
        BookmarkManager.bookmarks.pop(elem_id)
    else:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"No element with id: [{elem_id}] has been bookmarked.",
        )


@router.post("/", summary="Add a bookmark")
def addBookmark(elem_id: str, description: str = Query(..., max_length=100)):
    """
    Add a bookmark.

    **elem_id**: Id of bookmarked element
    **description**: Custom description written by the user
    """
    BookmarkManager.bookmarks[elem_id] = Bookmark(elem_id=elem_id, description=description)
