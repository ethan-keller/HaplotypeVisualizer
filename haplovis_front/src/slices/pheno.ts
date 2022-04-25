import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PhenoRecord, PhenoState, PhenoValue } from '../types/pheno';

const initialState: PhenoState = {
  sampleFilters: [],
  phenoFilters: {},
};

export const phenoSlice = createSlice({
  name: 'pheno',
  initialState: initialState,
  reducers: {
    addSampleFilter: (state, action: PayloadAction<string[]>) => {
      state.sampleFilters = action.payload;
    },
    addPhenoFilter: (state, action: PayloadAction<PhenoRecord[]>) => {
      let result: Record<string, PhenoValue[]> = {};
      action.payload.forEach((phenoR) => {
        if (Object.keys(phenoR).length !== 1) return;
        const record = Object.entries(phenoR)[0];
        if (!(record[0] in result)) {
          result[record[0]] = [];
        }
        result[record[0]].push(record[1]);
      });
      state.phenoFilters = result;
    },
    reset: (state) => {
      state.sampleFilters = [];
      state.phenoFilters = {};
    },
  },
});

export const { addPhenoFilter, addSampleFilter, reset } = phenoSlice.actions;

export default phenoSlice.reducer;
