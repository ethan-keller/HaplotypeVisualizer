import baseUrl from './base';

const bookmarkPathPrefix = '/bookmarks';
export const bookmarkBaseUrl = baseUrl + bookmarkPathPrefix;

export const getBookmarks = '/';
export const removeBookmark = '/remove';
export const removeAllBookmarks = '/remove_all';
export const addBookmark = '/add';
export const getBookmark = '/bookmark';
export const isBookmarked = '/is_bookmarked';
export const exportBookmarks = '/export';
