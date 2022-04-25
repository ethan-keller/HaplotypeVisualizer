import { Bookmark } from '../types/bookmark';

export const isBookmarked = (bookmarks: Bookmark[] | undefined, id: string) => {
  if (!bookmarks) return false;

  for (const bookmark of bookmarks) {
    if (bookmark.elem_id === id) return true;
  }

  return false;
};
