import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PhenoIsolate, PhenoState, PhenoValue } from '../types/pheno';

const initialState: PhenoState = {
  sampleFilters: new Set<string>(),
  sampleFilteredSegments: new Set<string>(),
  phenoFilters: {},
  phenoFilteredSegments: new Set<string>(),
  isolate: {
    isolateSegments: new Set<string>(),
    color: '#1B998B',
    pheno: { phenotype: '', value: '', label: '' },
  },
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
    updateIsolate: (state, action: PayloadAction<PhenoIsolate>) => {
      state.isolate.isolateSegments = action.payload.isolateSegments;
      state.isolate.color = action.payload.color;
      state.isolate.pheno = action.payload.pheno;
    },
    clearIsolate: (state) => {
      state.isolate.isolateSegments = initialState.isolate.isolateSegments;
      state.isolate.color = initialState.isolate.color;
      state.isolate.pheno = initialState.isolate.pheno;
    },
    reset: () => initialState,
  },
});

export const { addPhenoFilter, addSampleFilter, updateIsolate, clearIsolate, reset } =
  phenoSlice.actions;

export default phenoSlice.reducer;
