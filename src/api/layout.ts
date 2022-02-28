import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getLayout, layoutBaseUrl } from '../endpoints_config/LayoutEndpoints';
import Layout from '../types/layout';

const layoutApi = createApi({
  reducerPath: 'layoutApi',
  baseQuery: fetchBaseQuery({ baseUrl: layoutBaseUrl, method: 'GET' }),
  endpoints: (builder) => ({
    getLayout: builder.query<Layout, void>({
      query: () => ({ url: getLayout }),
    }),
  }),
});

export default layoutApi;
