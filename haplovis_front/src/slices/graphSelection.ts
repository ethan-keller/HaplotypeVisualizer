import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FeatureSelection, GraphSelectionState } from '../types/graph';

const initialState: GraphSelectionState = {
  feature: undefined,
};

export const graphSelectionSlice = createSlice({
  name: 'graphSelection',
  initialState: initialState,
  reducers: {
    updateFeature: (state, action: PayloadAction<FeatureSelection | undefined>) => {
      state.feature = action.payload;
    },
    reset: (state) => {
      state.feature = initialState.feature;
    },
  },
});

export const { updateFeature, reset } = graphSelectionSlice.actions;

export default graphSelectionSlice.reducer;
