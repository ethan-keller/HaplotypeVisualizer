import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  layoutBaseUrl,
  getDensities,
  getAllLayoutNodes,
  getRangeLayoutNodes,
} from '../endpoints_config/LayoutEndpoints';
import Density from '../types/density';
import { Layout, RectangleRange } from '../types/layout';

const layoutApi = createApi({
  reducerPath: 'layoutApi',
  baseQuery: fetchBaseQuery({ baseUrl: layoutBaseUrl }),
  endpoints: (builder) => ({
    getAllLayoutNodes: builder.query<Layout, void>({
      query: () => ({ url: getAllLayoutNodes, method: 'GET' }),
    }),
    getRangeLayoutNodes: builder.query<Layout, RectangleRange>({
      query: (range) => ({
        url: getRangeLayoutNodes,
        method: 'GET',
        params: { range: JSON.stringify(range) },
      }),
    }),
    getDensities: builder.query<Density, void>({
      query: () => ({ url: getDensities, method: 'GET' }),
    }),
  }),
});

export default layoutApi;
