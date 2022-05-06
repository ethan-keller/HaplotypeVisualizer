import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  addBookmark,
  getBookmarks,
  removeBookmark,
  bookmarkBaseUrl,
  removeAllBookmarks,
  getBookmark,
  isBookmarked,
  exportBookmarks,
} from '../endpoints_config/BookmarkEndpoints';
import { Bookmark } from '../types/bookmark';

const bookmarksApi = createApi({
  reducerPath: 'bookmarksApi',
  baseQuery: fetchBaseQuery({ baseUrl: bookmarkBaseUrl }),
  tagTypes: ['Bookmark'],
  endpoints: (builder) => ({
    getBookmarks: builder.query<Record<string, Bookmark>, void>({
      query: () => ({ url: getBookmarks, method: 'GET' }),
      providesTags: (bookmarks) =>
        bookmarks
          ? [
              'Bookmark',
              ...Object.values(bookmarks).map((bookmark) => ({
                type: 'Bookmark' as const,
                id: bookmark.elem_id,
              })),
            ]
          : ['Bookmark'],
    }),
    addBookmark: builder.mutation<void, Bookmark>({
      query: (params) => ({ url: addBookmark, params: params, method: 'POST' }),
      invalidatesTags: (result, error, args) => ['Bookmark'],
    }),
    removeBookmark: builder.mutation<Bookmark, { elem_id: string }>({
      query: (params) => ({ url: removeBookmark, params: params, method: 'DELETE' }),
      invalidatesTags: (result, error, args) => [{ type: 'Bookmark', id: result?.elem_id }],
    }),
    removeAllBookmarks: builder.mutation<void, void>({
      query: () => ({ url: removeAllBookmarks, method: 'DELETE' }),
      invalidatesTags: (result, error, args) => ['Bookmark'],
    }),
    getBookmark: builder.query<Bookmark, { elem_id: string }>({
      query: (params) => ({ url: getBookmark, params: params, method: 'GET' }),
      providesTags: (result, error, arg) => [{ type: 'Bookmark', id: result?.elem_id }],
    }),
    isBookmarked: builder.query<boolean, { elem_id: string }>({
      query: (params) => ({ url: isBookmarked, params: params, method: 'GET' }),
    }),
    exportBookmarks: builder.mutation<string, void>({
      query: () => ({ url: exportBookmarks, method: 'POST' }),
    }),
  }),
});

export default bookmarksApi;
