import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  getNodeBounds,
  getNodePositions,
  layoutBaseUrl,
  prepareLayout,
  getDensities,
} from '../endpoints_config/LayoutEndpoints';
import Density from '../types/density';
import { Bounds, Layout } from '../types/layout';

const layoutApi = createApi({
  reducerPath: 'layoutApi',
  baseQuery: fetchBaseQuery({ baseUrl: layoutBaseUrl }),
  endpoints: (builder) => ({
    prepareLayout: builder.mutation<void, void>({
      query: () => ({ url: prepareLayout, method: 'PUT' }),
    }),
    getNodePositions: builder.query<Layout, void>({
      query: () => ({ url: getNodePositions, method: 'GET' }),
    }),
    getNodeBounds: builder.query<Bounds[], void>({
      query: () => ({ url: getNodeBounds, method: 'GET' }),
    }),
    getDensities: builder.query<Density, void>({
      query: () => ({ url: getDensities, method: 'GET' }),
    }),
  }),
});

export default layoutApi;
