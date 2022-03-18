import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GraphSettings } from '../types/graph';

const initialState: GraphSettings = {
  drawPaths: true,
  drawLabels: false,
  linkThickness: 1.5,
  segmentThickness: 10,
  pathColors: ['#EF476F', '#FFD166', '#06D6A0', '#118AB2', '#073B4C'],
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
    reset: (state) => {
      state = initialState;
    },
  },
});

export const { updateDrawPaths, updateDrawLabels, updateLinkThickness, updateSegmentThickness } =
  graphSettingsSlice.actions;

export default graphSettingsSlice.reducer;
