from typing import Dict, Optional
from fastapi import APIRouter, Query, HTTPException, status

from server.schemas.bookmark import Bookmark
from server.managers import BookmarkManager


router = APIRouter(prefix="/bookmarks", tags=["bookmarks"])


@router.get("/", response_model=Dict[str, Bookmark], summary="Get all bookmarks")
def get_bookmarks():
    """
    Get all bookmarks.
    """
    return BookmarkManager.bookmarks


@router.delete("/remove", response_model=Bookmark, summary="remove a bookmark")
def remove_bookmark(elem_id: str):
    """
    Remove a bookmark given the element's id.

    **elem_id**: Id of bookmarked element
    """
    if BookmarkManager.contains_bookmark(elem_id):
        return BookmarkManager.remove_bookmark(elem_id)
    else:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"No element with id: [{elem_id}] has been bookmarked.",
        )


@router.delete("/remove_all", summary="remove all bookmarks")
def remove_bookmarks():
    """
    Remove all bookmarks.
    """
    BookmarkManager.clear_bookmarks()


@router.post("/add", summary="Add a bookmark")
def add_bookmark(elem_id: str, comment: str = Query(..., max_length=100)):
    """
    Add a bookmark.

    **elem_id**: Id of bookmarked element
    **comment**: Comment written by the user
    """
    BookmarkManager.add_bookmark(elem_id, comment)


@router.get("/is_bookmarked", response_model=bool)
def is_bookmarked(elem_id: str):
    """
    Returns whether the given element is bookmarked.
    """
    return elem_id in BookmarkManager.bookmarks


@router.get("/bookmark", response_model=Bookmark)
def get_bookmark(elem_id: str):
    """
    Returns whether the given element is bookmarked.
    """
    if elem_id not in BookmarkManager.bookmarks:
        return None
    return BookmarkManager.bookmarks[elem_id]
