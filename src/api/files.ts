import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  clearFile,
  fileBaseUrl,
  getAllFiles,
  getFile,
  prepareFiles,
  ready,
  updateFile,
} from '../endpoints_config/FileEndpoints';
import { File, GetFileParams, UpdateFileParams, ClearFileParams } from '../types/files';

export const filesApi = createApi({
  reducerPath: 'filesApi',
  baseQuery: fetchBaseQuery({ baseUrl: fileBaseUrl }),
  tagTypes: ['File'],
  endpoints: (builder) => ({
    getAllFiles: builder.query<File[], void>({
      query: () => ({ url: getAllFiles, method: 'GET' }),
      providesTags: (files) =>
        files
          ? ['File', ...files?.map((file) => ({ type: 'File' as const, id: file.id }))]
          : ['File'],
    }),
    getFile: builder.query<File, GetFileParams>({
      query: (params) => ({ url: getFile, params: params, method: 'GET' }),
      providesTags: (file, error, args) => [{ type: 'File', id: args.id }],
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
  }),
});

export default filesApi;
