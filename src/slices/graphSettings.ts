import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GraphSettings } from '../types/graph';

const initialState: GraphSettings = {
  drawPaths: true,
  drawLabels: false,
  linkThickness: 1.5,
  segmentThickness: 10,
  pathColors: ['#DB3E00', '#FCCB00', '#008B02', '#1273DE', '#EB9694'],
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

export const { updateDrawPaths, updateDrawLabels, updateLinkThickness, updateSegmentThickness, setActivePaths, toggleActivePath } =
  graphSettingsSlice.actions;

export default graphSettingsSlice.reducer;
