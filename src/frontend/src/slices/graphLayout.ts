import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Bounds, GraphLayoutState, Position, RectangleRange } from '../types/layout';

const initialState: GraphLayoutState = {
  viewport: { lu: { x: 0, y: 0 }, rd: { x: 1000, y: 1000 } },
  zoom: 1,
  pan: { x: 0, y: 0 },
  bufferSize: 0,
  extent: { xl: 0, xr: 1000 },
  firstGraphRender: true,
};

export const graphLayoutSlice = createSlice({
  name: 'graphLayout',
  initialState: initialState,
  reducers: {
    updateViewport: (state, action: PayloadAction<RectangleRange>) => {
      state.extent.xl = action.payload.lu.x;
      state.extent.xr = action.payload.rd.x;
      if (viewportNeedsUpdate(state.viewport, action.payload, state.bufferSize)) {
        if (state.bufferSize === 0) {
          state.bufferSize = 300;
        }
        state.viewport = addViewportBuffer(action.payload, 4 * state.bufferSize);
      }
    },
    updateZoom: (state, action: PayloadAction<number>) => {
      state.zoom = Math.max(0.3, action.payload);
    },
    updatePan: (state, action: PayloadAction<Position>) => {
      state.pan.x = action.payload.x;
      state.pan.y = action.payload.y;
    },
    updateBufferSize: (state, action: PayloadAction<number>) => {
      state.bufferSize = action.payload;
    },
    updateExtent: (state, action: PayloadAction<Bounds>) => {
      state.extent.xl = action.payload.xl;
      state.extent.xr = action.payload.xr;
    },
    updateFirstGraphRender: (state, action: PayloadAction<boolean>) => {
      state.firstGraphRender = action.payload;
    },
    reset: () => initialState,
  },
});

const viewportNeedsUpdate = (
  currentViewport: RectangleRange,
  newViewport: RectangleRange,
  buffer: number,
) => {
  // if new viewport passes at least one limit => update
  return (
    newViewport.lu.x <= currentViewport.lu.x + buffer ||
    newViewport.lu.y <= currentViewport.lu.y + buffer ||
    newViewport.rd.x >= currentViewport.rd.x - buffer ||
    newViewport.rd.y >= currentViewport.rd.y - buffer
  );
};

const addViewportBuffer = (viewport: RectangleRange, bufferSize: number) => {
  const newLu = { x: viewport.lu.x - bufferSize, y: viewport.lu.y - bufferSize };
  const newRd = { x: viewport.rd.x + bufferSize, y: viewport.rd.y + bufferSize };

  return { lu: newLu, rd: newRd } as RectangleRange;
};

export const {
  updateZoom,
  updatePan,
  updateExtent,
  updateViewport,
  updateFirstGraphRender,
  reset,
} = graphLayoutSlice.actions;

export default graphLayoutSlice.reducer;
