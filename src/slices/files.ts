import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { File } from '../types/files';

interface FilesState {
  files: File[];
}

const initialState: FilesState = {
  files: []
};

export const filesSlice = createSlice({
  name: 'files',
  initialState: initialState,
  reducers: {},
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default filesSlice.reducer;
