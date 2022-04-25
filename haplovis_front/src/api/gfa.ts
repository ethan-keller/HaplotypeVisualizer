import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  getGfa,
  getLinks,
  getSegments,
  getPaths,
  getGfaInfo,
  gfaBaseUrl,
  getGfaHistValues,
} from '../endpoints_config/GfaEndpoints';
import Gfa, { GfaLink, GfaPath, GfaSegment, GfaInfo, GfaHist } from '../types/gfa';

const gfaApi = createApi({
  reducerPath: 'gfaApi',
  baseQuery: fetchBaseQuery({ baseUrl: gfaBaseUrl, method: 'GET' }),
  endpoints: (builder) => ({
    getGfa: builder.query<Gfa, void>({
      query: () => ({ url: getGfa }),
    }),
    getSegments: builder.query<GfaSegment[], void>({
      query: () => ({ url: getSegments }),
    }),
    getLinks: builder.query<GfaLink[], void>({
      query: () => ({ url: getLinks }),
    }),
    getPaths: builder.query<GfaPath[], void>({
      query: () => ({ url: getPaths }),
    }),
    getGraphInfo: builder.query<GfaInfo, void>({
      query: () => ({ url: getGfaInfo }),
    }),
    getGfaHistValues: builder.query<GfaHist, void>({
      query: () => ({ url: getGfaHistValues }),
    }),
  }),
});

export default gfaApi;
