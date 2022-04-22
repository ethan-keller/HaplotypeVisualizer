import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RectangleRange } from '../types/layout';

// TODO: add type for initial state of this slice
const initialState = {
  viewport: { lu: { x: 0, y: 0 }, rd: { x: 1000, y: 1000 } } as RectangleRange,
};

export const graphLayoutSlice = createSlice({
  name: 'graphLayout',
  initialState: initialState,
  reducers: {
    updateViewport: (state, action: PayloadAction<RectangleRange>) => {
      state.viewport = action.payload;
    },
    reset: (state) => {
      state = initialState;
    },
  },
});

export const { updateViewport, reset } = graphLayoutSlice.actions;

export default graphLayoutSlice.reducer;
