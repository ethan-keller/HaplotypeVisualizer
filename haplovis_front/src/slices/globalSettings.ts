import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GlobalSettings } from '../types/settings';

const initialState: GlobalSettings = {
  zoomScale: 0.15,
  navigatorDownSampleFactor: undefined,
  panSensitivity: 100,
  histogramBins: 6,
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
        state.histogramBins = action.payload;
      },
    reset: (state) => {
      state = initialState;
    },
  },
});

export const { updateZoomScale, updatePanSensitivity, updateNavigatorDownSampleFactor, updateHistogramBins } =
  globalSettingsSlice.actions;

export default globalSettingsSlice.reducer;
