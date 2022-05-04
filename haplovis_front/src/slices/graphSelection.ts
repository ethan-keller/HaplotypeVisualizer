import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GfaFeature } from '../types/gfa';
import { GraphSelectionState } from '../types/graph';

const initialState: GraphSelectionState = {
  feature: undefined,
};

export const graphSelectionSlice = createSlice({
  name: 'graphSelection',
  initialState: initialState,
  reducers: {
    updateFeature: (state, action: PayloadAction<GfaFeature | undefined>) => {
      state.feature = action.payload;
    },
    reset: (state) => {
      state = initialState;
    },
  },
});

export const { updateFeature, reset } = graphSelectionSlice.actions;

export default graphSelectionSlice.reducer;
