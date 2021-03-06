import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  getLinks,
  getSegments,
  getPaths,
  getGfaInfo,
  gfaBaseUrl,
  getGfaSegmentLengths,
  getSegment,
  getLink,
  getGfaSegmentNames,
} from '../endpoints_config/GfaEndpoints';
import { GfaLink, GfaPath, GfaSegment, GfaInfo } from '../types/gfa';

const gfaApi = createApi({
  reducerPath: 'gfaApi',
  baseQuery: fetchBaseQuery({ baseUrl: gfaBaseUrl, method: 'GET' }),
  endpoints: (builder) => ({
    getSegments: builder.query<GfaSegment[], string[]>({
      query: (body) => ({ url: getSegments, body, method: 'PUT' }),
    }),
    getSegment: builder.query<GfaSegment, { segment_id: string }>({
      query: (params) => ({ url: getSegment, params: params }),
    }),
    getLinks: builder.query<GfaLink[], string[]>({
      query: (body) => ({ url: getLinks, body, method: 'PUT' }),
    }),
    getLink: builder.query<GfaLink, { link_id: string }>({
      query: (params) => ({ url: getLink, params: params }),
    }),
    getPaths: builder.query<Record<string, GfaPath>, void>({
      query: () => ({ url: getPaths }),
    }),
    getGraphInfo: builder.query<GfaInfo, void>({
      query: () => ({ url: getGfaInfo }),
    }),
    getGfaSegmentLengths: builder.query<number[], void>({
      query: () => ({ url: getGfaSegmentLengths }),
    }),
    getGfaSegmentNames: builder.query<string[], void>({
      query: () => ({ url: getGfaSegmentNames }),
    }),
  }),
});

export default gfaApi;
