import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GraphSettings } from '../types/graph';

const initialState: GraphSettings = {
  drawPaths: true,
  drawLabels: false,
  linkThickness: 1.5,
  segmentThickness: 10,
  zoomScale: 0.15,
  navigatorDownSampleFactor: undefined,
  panSensitivity: 100,
  pathColors: [
    '#EF4394',
    '#BB2224',
    '#EB9FD4',
    '#A6A9A4',
    '#DD96A4',
    '#DB3E00',
    '#FCCB00',
    '#008B02',
    '#1273DE',
    '#EB9694',
  ],
  activePaths: [],
};

export const graphSettingsSlice = createSlice({
  name: 'graphSettings',
  initialState: initialState,
  reducers: {
    updateDrawPaths: (state, action: PayloadAction<boolean>) => {
      state.drawPaths = action.payload;
    },
    updateDrawLabels: (state, action: PayloadAction<boolean>) => {
      state.drawLabels = action.payload;
    },
    updateLinkThickness: (state, action: PayloadAction<number>) => {
      state.linkThickness = action.payload;
    },
    updateZoomScale: (state, action: PayloadAction<number>) => {
      state.zoomScale = action.payload;
    },
    updatePanSensitivity: (state, action: PayloadAction<number>) => {
      state.panSensitivity = action.payload;
    },
    updateNavigatorDownSampleFactor: (state, action: PayloadAction<number | undefined>) => {
      state.navigatorDownSampleFactor = action.payload;
    },
    updateSegmentThickness: (state, action: PayloadAction<number>) => {
      state.segmentThickness = action.payload;
    },
    updatePathColor: (state, action: PayloadAction<{ path: number; color: string }>) => {
      if (action.payload.path >= 0 && action.payload.path < state.pathColors.length) {
        state.pathColors[action.payload.path] = action.payload.color;
      }
    },
    updatePathColors: (state, action: PayloadAction<string[]>) => {
      state.pathColors = action.payload;
    },
    setActivePaths: (state, action: PayloadAction<boolean[]>) => {
      state.activePaths = action.payload;
    },
    toggleActivePath: (state, action: PayloadAction<number>) => {
      state.activePaths[action.payload] = !state.activePaths[action.payload];
    },
    reset: (state) => {
      state = initialState;
    },
  },
});

export const {
  updateDrawPaths,
  updatePathColors,
  updatePathColor,
  updateDrawLabels,
  updateLinkThickness,
  updateZoomScale,
  updatePanSensitivity,
  updateNavigatorDownSampleFactor,
  updateSegmentThickness,
  setActivePaths,
  toggleActivePath,
} = graphSettingsSlice.actions;

export default graphSettingsSlice.reducer;
