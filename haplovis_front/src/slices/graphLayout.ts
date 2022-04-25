import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GraphLayoutState, Position, RectangleRange } from '../types/layout';

// TODO: add type for initial state of this slice
const initialState: GraphLayoutState = {
  viewport: { lu: { x: 0, y: 0 }, rd: { x: 1000, y: 1000 } },
  zoom: 1,
  pan: { x: 0, y: 0 },
  bufferSize: 100,
};

export const graphLayoutSlice = createSlice({
  name: 'graphLayout',
  initialState: initialState,
  reducers: {
    updateViewport: (state, action: PayloadAction<RectangleRange>) => {
      if (viewportNeedsUpdate(state.viewport, action.payload, state.bufferSize)) {
        state.viewport = addViewportBuffer(action.payload, state.bufferSize);
      }
    },
    updateZoom: (state, action: PayloadAction<number>) => {
      state.zoom = action.payload;
    },
    updatePan: (state, action: PayloadAction<Position>) => {
      state.pan.x = action.payload.x;
      state.pan.y = action.payload.y;
    },
    updateBufferSize: (state, action: PayloadAction<number>) => {
      state.bufferSize = action.payload;
    },
    reset: (state) => {
      state = initialState;
    },
  },
});

const viewportNeedsUpdate = (
  currentViewport: RectangleRange,
  newViewport: RectangleRange,
  bufferSize: number,
) => {
  // left, top, right, bottom limits
  const ll = currentViewport.lu.x - bufferSize;
  const tl = currentViewport.lu.y - bufferSize;
  const rl = currentViewport.rd.x + bufferSize;
  const bl = currentViewport.rd.y + bufferSize;

  // if new viewport passes at least one limit => update
  return (
    newViewport.lu.x <= ll ||
    newViewport.lu.y <= tl ||
    newViewport.rd.x >= rl ||
    newViewport.rd.y >= bl
  );
};

const addViewportBuffer = (viewport: RectangleRange, bufferSize: number) => {
  const newLu = { x: viewport.lu.x - bufferSize, y: viewport.lu.y - bufferSize };
  const newRd = { x: viewport.rd.x + bufferSize, y: viewport.rd.y + bufferSize };

  return { lu: newLu, rd: newRd } as RectangleRange;
};

export const { updateViewport, updateZoom, updatePan, reset } = graphLayoutSlice.actions;

export default graphLayoutSlice.reducer;
