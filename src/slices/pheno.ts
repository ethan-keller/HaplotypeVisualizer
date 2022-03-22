import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PhenoRecord, PhenoState } from '../types/pheno';

const initialState: PhenoState = {
  sampleFilters: [],
  phenoFilters: {},
};

export const phenoSlice = createSlice({
  name: 'pheno',
  initialState: initialState,
  reducers: {
    addSampleFilter: (state, action: PayloadAction<string>) => {
      state.sampleFilters.push(action.payload);
    },
    removeSampleFilter: (state, action: PayloadAction<string>) => {
      const i = state.sampleFilters.indexOf(action.payload);
      if (i > -1) {
        state.sampleFilters.splice(i, 1);
      }
    },
    addPhenoFilter: (state, action: PayloadAction<PhenoRecord>) => {
      Object.entries(action.payload).forEach(([phenotype, phenoValue]) => {
        if (phenotype! in state.phenoFilters) {
          state.phenoFilters[phenotype] = [];
        }
        state.phenoFilters[phenotype].push(phenoValue);
      });
    },
    removePhenoFilter: (state, action: PayloadAction<string>) => {
      Object.entries(action.payload).forEach(([phenotype, phenoValue]) => {
        if (phenotype in state.phenoFilters) {
          const i = state.phenoFilters[phenotype].indexOf(action.payload);
          if (i > -1) {
            state.phenoFilters[phenotype].splice(i, 1);
          }
        }
      });
    },
    reset: (state) => {
      state = initialState;
    },
  },
});

export const { addPhenoFilter, addSampleFilter, removePhenoFilter, removeSampleFilter, reset } =
  phenoSlice.actions;

export default phenoSlice.reducer;
