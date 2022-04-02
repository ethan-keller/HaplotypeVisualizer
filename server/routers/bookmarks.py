from typing import List
from fastapi import APIRouter, Query, HTTPException, status

from schemas.bookmark import Bookmark
from server_data.data import BookmarkManager


router = APIRouter(prefix="/bookmarks", tags=["bookmarks"])


@router.get("/", response_model=List[Bookmark], summary="Get all bookmarks")
def getFiles():
    """
    Get all bookmarks.
    """
    return list(BookmarkManager.bookmarks.values())


@router.delete("/remove", summary="remove a bookmark")
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


@router.delete("/remove_all", summary="remove all bookmarks")
def removeBookmarks():
    """
    Remove all bookmarks.
    """
    BookmarkManager.bookmarks = {}


@router.post("/add", summary="Add a bookmark")
def addBookmark(elem_id: str, comment: str = Query(..., max_length=100)):
    """
    Add a bookmark.

    **elem_id**: Id of bookmarked element
    **comment**: Comment written by the user
    """
    BookmarkManager.bookmarks[elem_id] = Bookmark(elem_id=elem_id, comment=comment)
