import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PhenoIsolate, PhenoState, Phenotype } from '../types/pheno';

const initialState: PhenoState = {
  sampleFilters: new Set<string>(),
  sampleFilteredSegments: new Set<string>(),
  phenoFilters: {},
  phenoFilteredSegments: new Set<string>(),
  isolate: undefined,
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
      action: PayloadAction<{ phenos: Record<string, Set<Phenotype>>; segments: string[] }>,
    ) => {
      state.phenoFilters = action.payload.phenos;
      state.phenoFilteredSegments = new Set<string>(action.payload.segments);
    },
    updateIsolate: (state, action: PayloadAction<PhenoIsolate>) => {
      if (!state.isolate) {
        state.isolate = { phenoFeature: '', isolateColors: {} };
      }
      state.isolate.isolateColors = action.payload.isolateColors;
      state.isolate.phenoFeature = action.payload.phenoFeature;
    },
    clearIsolate: (state) => {
      state.isolate = undefined;
    },
    reset: () => initialState,
  },
});

export const { addPhenoFilter, addSampleFilter, updateIsolate, clearIsolate, reset } =
  phenoSlice.actions;

export default phenoSlice.reducer;
