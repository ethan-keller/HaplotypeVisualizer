import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GraphSettings } from '../types/graph';
import { initialState as globalSettings } from './globalSettings';

const initialState: GraphSettings = {
  drawPaths: globalSettings.defaultDrawPaths,
  drawLabels: globalSettings.defaultDrawLabels,
  linkThickness: globalSettings.defaultLinkThickness,
  segmentThickness: globalSettings.defaultSegmentThickness,
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
