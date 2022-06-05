import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistor } from '../store';
import { GlobalSettings } from '../types/settings';

export const initialState: GlobalSettings = {
  zoomScale: 0.15,
  navigatorDownSampleFactor: undefined,
  panSensitivity: 100,
  defaultHistogramBins: 6,
  defaultDrawPaths: true,
  defaultDrawLabels: false,
  defaultSegmentThickness: 10,
  defaultLinkThickness: 1.5,
  reversePan: false,
  navigatorTwoViews: false,
};

export const globalSettingsSlice = createSlice({
  name: 'globalSettings',
  initialState: initialState,
  reducers: {
    updateZoomScale: (state, action: PayloadAction<number>) => {
      state.zoomScale = action.payload;
    },
    updatePanSensitivity: (state, action: PayloadAction<number>) => {
      state.panSensitivity = action.payload;
    },
    updateNavigatorDownSampleFactor: (state, action: PayloadAction<number | undefined>) => {
      state.navigatorDownSampleFactor = action.payload;
    },
    updateHistogramBins: (state, action: PayloadAction<number>) => {
      state.defaultHistogramBins = action.payload;
    },
    updateDefaultDrawPaths: (state, action: PayloadAction<boolean>) => {
      state.defaultDrawPaths = action.payload;
    },
    updateDefaultDrawLabels: (state, action: PayloadAction<boolean>) => {
      state.defaultDrawLabels = action.payload;
    },
    updateDefaultSegmentThickness: (state, action: PayloadAction<number>) => {
      state.defaultSegmentThickness = action.payload;
    },
    updateDefaultLinkThickness: (state, action: PayloadAction<number>) => {
      state.defaultLinkThickness = action.payload;
    },
    updateReversePan: (state, action: PayloadAction<boolean>) => {
      state.reversePan = action.payload;
    },
    updateNavigatorTwoViews: (state, action: PayloadAction<boolean>) => {
      state.navigatorTwoViews = action.payload;
    },
    reset: () => initialState,
  },
});

export const {
  updateZoomScale,
  updatePanSensitivity,
  updateNavigatorDownSampleFactor,
  updateHistogramBins,
  updateDefaultDrawLabels,
  updateDefaultDrawPaths,
  updateDefaultSegmentThickness,
  updateDefaultLinkThickness,
  updateReversePan,
  updateNavigatorTwoViews,
  reset,
} = globalSettingsSlice.actions;

export default globalSettingsSlice.reducer;
