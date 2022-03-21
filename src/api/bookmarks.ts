import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  addBookmark,
  getBookmarks,
  removeBookmark,
  bookmarkBaseUrl,
} from '../endpoints_config/BookmarkEndpoints';
import { Bookmark } from '../types/bookmark';

const bookmarksApi = createApi({
  reducerPath: 'bookmarksApi',
  baseQuery: fetchBaseQuery({ baseUrl: bookmarkBaseUrl }),
  tagTypes: ['Bookmark'],
  endpoints: (builder) => ({
    getBookmarks: builder.query<Bookmark[], void>({
      query: () => ({ url: getBookmarks, method: 'GET' }),
      providesTags: (bookmarks) =>
        bookmarks
          ? [
              'Bookmark',
              ...bookmarks.map((bookmark) => ({ type: 'Bookmark' as const, id: bookmark.elem_id })),
            ]
          : ['Bookmark'],
    }),
    addBookmark: builder.mutation<void, Bookmark>({
      query: (params) => ({ url: addBookmark, params: params, method: 'POST' }),
      invalidatesTags: (result, error, args) => ['Bookmark'],
    }),
    removeBookmark: builder.mutation<void, { elem_id: string }>({
      query: (params) => ({ url: removeBookmark, params: params, method: 'DELETE' }),
      invalidatesTags: (result, error, args) => ['Bookmark'],
    }),
  }),
});

export default bookmarksApi;
