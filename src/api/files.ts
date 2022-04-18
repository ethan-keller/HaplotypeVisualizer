import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  clearFile,
  fileBaseUrl,
  getAllFiles,
  getFile,
  prepareFiles,
  preprocess,
  ready,
  updateFile,
  uploadLayout,
} from '../endpoints_config/FileEndpoints';
import { File, GetFileParams, UpdateFileParams, ClearFileParams } from '../types/files';

const filesApi = createApi({
  reducerPath: 'filesApi',
  baseQuery: fetchBaseQuery({ baseUrl: fileBaseUrl }),
  tagTypes: ['File'],
  endpoints: (builder) => ({
    getAllFiles: builder.query<File[], void>({
      query: () => ({ url: getAllFiles, method: 'GET' }),
      providesTags: ['File'],
    }),
    getFile: builder.query<File, GetFileParams>({
      query: (params) => ({ url: getFile, params: params, method: 'GET' }),
      providesTags: (file, error, args) => ['File'],
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
    prepareFiles: builder.mutation<void, void>({
      query: () => ({ url: prepareFiles, method: 'PUT' }),
    }),
    preprocess: builder.mutation<void, void>({
      query: () => ({ url: preprocess, method: 'PUT' }),
      invalidatesTags: (result, error, args) => ['File'],
    }),
    uploadLayout: builder.mutation<void, FormData>({
      query: (formData) => ({ url: uploadLayout, method: 'POST', body: formData }),
      invalidatesTags: (result, error, args) => ['File'],
    }),
  }),
});

export default filesApi;
