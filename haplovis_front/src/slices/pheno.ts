import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PhenoState, PhenoValue } from '../types/pheno';

const initialState: PhenoState = {
  sampleFilters: new Set<string>(),
  sampleFilteredSegments: new Set<string>(),
  phenoFilters: {},
  phenoFilteredSegments: new Set<string>(),
};

export const phenoSlice = createSlice({
  name: 'pheno',
  initialState: initialState,
  reducers: {
    addSampleFilter: (state, action: PayloadAction<{ samples: string[]; segments: string[] }>) => {
      state.sampleFilters = new Set<string>(action.payload.samples);
      state.sampleFilteredSegments = new Set<string>(action.payload.segments);
    },
    addPhenoFilter: (
      state,
      action: PayloadAction<{ phenos: Record<string, Set<PhenoValue>>; segments: string[] }>,
    ) => {
      state.phenoFilters = action.payload.phenos;
      state.phenoFilteredSegments = new Set<string>(action.payload.segments);
    },
    reset: (state) => {
      state.sampleFilters = new Set<string>();
      state.sampleFilteredSegments = new Set<string>();
      state.phenoFilters = {};
      state.phenoFilteredSegments = new Set<string>();
    },
  },
});

export const { addPhenoFilter, addSampleFilter, reset } = phenoSlice.actions;

export default phenoSlice.reducer;
