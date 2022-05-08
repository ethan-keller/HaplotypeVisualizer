import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  layoutBaseUrl,
  getDensities,
  getRangeLayoutNodes,
} from '../endpoints_config/LayoutEndpoints';
import { Layout, RectangleRange } from '../types/layout';

const layoutApi = createApi({
  reducerPath: 'layoutApi',
  baseQuery: fetchBaseQuery({ baseUrl: layoutBaseUrl }),
  endpoints: (builder) => ({
    getRangeLayoutNodes: builder.query<Layout, RectangleRange>({
      query: (range) => ({
        url: getRangeLayoutNodes,
        method: 'GET',
        params: { range: JSON.stringify(range) },
      }),
    }),
    getDensities: builder.query<number[], { down_sample_factor?: number }>({
      query: (params) => ({ url: getDensities, params: params, method: 'GET' }),
    }),
  }),
});

export default layoutApi;
