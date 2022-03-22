import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getPhenosPerSample, getPhenotypes, phenoBaseUrl } from '../endpoints_config/PhenoEndpoints';
import { PhenosPerSample, PhenotypeValues } from '../types/pheno';

const phenoApi = createApi({
  reducerPath: 'phenoApi',
  baseQuery: fetchBaseQuery({ baseUrl: phenoBaseUrl, method: 'GET' }),
  endpoints: (builder) => ({
    getPhenosPerSample: builder.query<PhenosPerSample, void>({
      query: () => ({url: getPhenosPerSample })
    }),
    getPhenotypes: builder.query<PhenotypeValues, void>({
      query: () => ({ url: getPhenotypes }),
    }),
  }),
});

export default phenoApi;
