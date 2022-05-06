import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  getGfa,
  getLinks,
  getSegments,
  getPaths,
  getGfaInfo,
  gfaBaseUrl,
  getGfaSegmentLengths,
  getSegment,
  getLink,
} from '../endpoints_config/GfaEndpoints';
import Gfa, { GfaLink, GfaPath, GfaSegment, GfaInfo } from '../types/gfa';

const gfaApi = createApi({
  reducerPath: 'gfaApi',
  baseQuery: fetchBaseQuery({ baseUrl: gfaBaseUrl, method: 'GET' }),
  endpoints: (builder) => ({
    getGfa: builder.query<Gfa, void>({
      query: () => ({ url: getGfa }),
    }),
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
  }),
});

export default gfaApi;
