import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  clearAll,
  clearFile,
  clearFolder,
  fileBaseUrl,
  getAllFiles,
  getDataFolder,
  getFile,
  getOutputFolder,
  gfaPhenoMatch,
  prepareFiles,
  preprocess,
  ready,
  updateFile,
  uploadBookmarks,
  uploadLayout,
} from '../endpoints_config/FileEndpoints';
import {
  File,
  GetFileParams,
  UpdateFileParams,
  ClearFileParams,
  UpdateFolderParams,
  ClearFolderParams,
} from '../types/files';

const filesApi = createApi({
  reducerPath: 'filesApi',
  baseQuery: fetchBaseQuery({ baseUrl: fileBaseUrl }),
  tagTypes: ['File', 'Folder'],
  endpoints: (builder) => ({
    getAllFiles: builder.query<File[], void>({
      query: () => ({ url: getAllFiles, method: 'GET' }),
      providesTags: ['File'],
    }),
    getFile: builder.query<File, GetFileParams>({
      query: (params) => ({ url: getFile, params: params, method: 'GET' }),
      providesTags: ['File'],
    }),
    areFilesReady: builder.query<boolean, void>({
      query: () => ({ url: ready, method: 'GET' }),
      providesTags: ['File'],
    }),
    updateFile: builder.mutation<void, UpdateFileParams>({
      query: (params) => ({ url: updateFile, params: params, method: 'PUT' }),
      invalidatesTags: (result, error, args) => ['File'],
    }),
    clearFile: builder.mutation<void, ClearFileParams>({
      query: (params) => ({ url: clearFile, params: params, method: 'PUT' }),
      invalidatesTags: (result, error, args) => ['File'],
    }),
    clearAll: builder.mutation<void, void>({
      query: () => ({ url: clearAll, method: 'PUT' }),
      invalidatesTags: (result, error, args) => ['File'],
    }),
    prepareFiles: builder.mutation<void, void>({
      query: () => ({ url: prepareFiles, method: 'PUT' }),
    }),
    preprocess: builder.mutation<void, void>({
      query: () => ({ url: preprocess, method: 'PUT' }),
      invalidatesTags: (result, error, args) => ['File'],
    }),
    uploadLayout: builder.mutation<void, FormData>({
      query: (formData) => ({ url: uploadLayout, body: formData, method: 'POST' }),
      invalidatesTags: (result, error, args) => ['File'],
    }),
    uploadBookmarks: builder.mutation<void, FormData>({
      query: (formData) => ({ url: uploadBookmarks, body: formData, method: 'POST' }),
      invalidatesTags: (result, error, args) => ['File'],
    }),
    getOutputFolder: builder.query<string, void>({
      query: () => ({ url: getOutputFolder, method: 'GET' }),
      providesTags: ['Folder'],
    }),
    getDataFolder: builder.query<string, void>({
      query: () => ({ url: getDataFolder, method: 'GET' }),
      providesTags: ['Folder'],
    }),
    matchGfaPheno: builder.mutation<boolean, void>({
      query: () => ({ url: gfaPhenoMatch, method: 'PUT' }),
    }),
    clearFolder: builder.mutation<void, ClearFolderParams>({
      query: (params) => ({ url: clearFolder, params: params, method: 'DELETE' }),
    }),
  }),
});

export default filesApi;
