import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GraphSettings } from '../types/graph';
import { initialState as globalSettings } from './globalSettings';

const initialState: GraphSettings = {
  drawPaths: globalSettings.defaultDrawPaths,
  drawLabels: globalSettings.defaultDrawLabels,
  linkThickness: globalSettings.defaultLinkThickness,
  segmentThickness: globalSettings.defaultSegmentThickness,
  pathColors: [
    '#9e0142',
    '#f46d43',
    '#ffd355',
    '#abdda4',
    '#3288bd',
    '#5e4fa2',
    '#000000',
    '#c8bcff',
    '#ffbcd7',
    '#04c55e',
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
    reset: () => initialState,
  },
});

export const {
  updateDrawPaths,
  updatePathColors,
  updatePathColor,
  updateDrawLabels,
  updateLinkThickness,
  updateSegmentThickness,
  setActivePaths,
  toggleActivePath,
  reset,
} = graphSettingsSlice.actions;

export default graphSettingsSlice.reducer;
