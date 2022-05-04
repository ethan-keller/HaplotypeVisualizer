import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Bounds, GraphLayoutState, Position, RectangleRange } from '../types/layout';

const initialState: GraphLayoutState = {
  viewport: { lu: { x: 0, y: 0 }, rd: { x: 200, y: 1000 } },
  zoom: 1,
  pan: { x: 0, y: 0 },
  bufferSize: 50,
  extent: { xl: 0, xr: 200 },
};

export const graphLayoutSlice = createSlice({
  name: 'graphLayout',
  initialState: initialState,
  reducers: {
    // updateViewport: (state, action: PayloadAction<RectangleRange>) => {
    //   state.extent.xl = action.payload.lu.x;
    //   state.extent.xr = action.payload.rd.x;
    //   if (viewportNeedsUpdate(state.viewport, action.payload, state.bufferSize)) {
    //     state.viewport = addViewportBuffer(action.payload, state.bufferSize);
    //   }
    // },
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
    updateExtent: (state, action: PayloadAction<Bounds>) => {
      state.extent.xl = action.payload.xl;
      state.extent.xr = action.payload.xr;
      // if (viewportNeedsUpdate(state.viewport, action.payload, state.bufferSize)) {
      //   state.viewport = addViewportBuffer(state.viewport, action.payload, state.bufferSize);
      // }
    },
    reset: (state) => {
      state = initialState;
    },
  },
});

const viewportNeedsUpdate = (
  currentViewport: RectangleRange,
  newExtent: Bounds,
  bufferSize: number,
) => {
  // left, top, right, bottom limits
  const ll = currentViewport.lu.x - bufferSize;
  // const tl = currentViewport.lu.y - bufferSize;
  const rl = currentViewport.rd.x + bufferSize;
  // const bl = currentViewport.rd.y + bufferSize;

  // if new viewport passes at least one limit => update
  return (
    newExtent.xl <= ll ||
    // newViewport.lu.y <= tl ||
    newExtent.xr >= rl
    // newViewport.rd.y >= bl
  );
};

const addViewportBuffer = (viewport: RectangleRange, extent: Bounds, bufferSize: number) => {
  const newLu = { x: extent.xl - bufferSize, y: viewport.lu.y - bufferSize };
  const newRd = { x: extent.xr + bufferSize, y: viewport.rd.y + bufferSize };

  return { lu: newLu, rd: newRd } as RectangleRange;
};

export const { updateZoom, updatePan, updateExtent, reset } = graphLayoutSlice.actions;

export default graphLayoutSlice.reducer;
