import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getPhenoTable, phenoBaseUrl } from '../endpoints_config/PhenoEndpoints';
import PhenoTable from '../types/pheno';

const phenoApi = createApi({
  reducerPath: 'phenoApi',
  baseQuery: fetchBaseQuery({ baseUrl: phenoBaseUrl, method: 'GET' }),
  endpoints: (builder) => ({
    getPhenoTable: builder.query<PhenoTable, void>({
      query: () => ({ url: getPhenoTable }),
    }),
  }),
});

export default phenoApi;
