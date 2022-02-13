import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import filesReducer from './slices/files';
import filesApi from './api/files';
import gfaApi from './api/gfa';

export const store = configureStore({
  reducer: {
    files: filesReducer,
    [filesApi.reducerPath]: filesApi.reducer,
    [gfaApi.reducerPath]: gfaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(filesApi.middleware).concat(gfaApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
