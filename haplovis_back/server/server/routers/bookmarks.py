from typing import Dict
from fastapi import APIRouter, Path, Query, HTTPException, UploadFile, status, File as FastApiFile
from server.managers.files import FileManager
from server.managers.gfa import GfaManager

from server.schemas.bookmark import Bookmark
from server.managers import BookmarkManager
from server.schemas.file import FileIndex, FileStatus


router = APIRouter(prefix="/bookmarks", tags=["bookmarks"])


@router.get("/", response_model=Dict[str, Bookmark], summary="Get all bookmarks")
async def get_bookmarks():
    """
    Get all bookmarks.
    """
    return BookmarkManager.bookmarks


@router.delete("/remove", response_model=Bookmark, summary="remove a bookmark")
async def remove_bookmark(elem_id: str):
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
async def remove_bookmarks():
    """
    Remove all bookmarks.
    """
    BookmarkManager.clear()


@router.post("/add", summary="Add a bookmark")
async def add_bookmark(elem_id: str, comment: str = Query(..., max_length=100)):
    """
    Add a bookmark.

    **elem_id**: Id of bookmarked element
    **comment**: Comment written by the user
    """
    BookmarkManager.add_bookmark(elem_id, comment)


@router.get("/is_bookmarked", response_model=bool)
async def is_bookmarked(elem_id: str):
    """
    Returns whether the given element is bookmarked.
    """
    return BookmarkManager.contains_bookmark(elem_id)


@router.get("/bookmark", response_model=Bookmark)
async def get_bookmark(elem_id: str):
    """
    Returns whether the given element is bookmarked.
    """
    if BookmarkManager.bookmarks is not None and elem_id in BookmarkManager.bookmarks:
        return BookmarkManager.bookmarks[elem_id]


@router.post("/export", response_model=str)
async def export_bookmarks():
    """
    Export the current bookmarks to a json file.
    """
    try:
        file_path = BookmarkManager.export()
        if file_path:
            return str(file_path)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Could not export bookmarks [{e}]"
        )
