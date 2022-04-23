import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GraphLayoutState, Position, RectangleRange } from '../types/layout';

// TODO: add type for initial state of this slice
const initialState: GraphLayoutState = {
  viewport: { lu: { x: 0, y: 1000 }, rd: { x: 1000, y: 0 } },
  zoom: 1,
  pan: { x: 0, y: 0 },
};

export const graphLayoutSlice = createSlice({
  name: 'graphLayout',
  initialState: initialState,
  reducers: {
    updateViewport: (state, action: PayloadAction<RectangleRange>) => {
      state.viewport = action.payload;
    },
    updateZoom: (state, action: PayloadAction<number>) => {
      state.zoom = action.payload;
    },
    updatePan: (state, action: PayloadAction<Position>) => {
      state.pan.x = action.payload.x
      state.pan.y = action.payload.y
    },
    reset: (state) => {
      state = initialState;
    },
  },
});

export const { updateViewport, updateZoom, updatePan, reset } = graphLayoutSlice.actions;

export default graphLayoutSlice.reducer;
