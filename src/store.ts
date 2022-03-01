import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import filesApi from './api/files';
import gfaApi from './api/gfa';
import phenoApi from './api/pheno';
import layoutApi from './api/layout';
import graphSettingsReducer from './slices/graphSettings';

export const store = configureStore({
  reducer: {
    graphSettings: graphSettingsReducer,
    [filesApi.reducerPath]: filesApi.reducer,
    [gfaApi.reducerPath]: gfaApi.reducer,
    [layoutApi.reducerPath]: layoutApi.reducer,
    [phenoApi.reducerPath]: phenoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      filesApi.middleware,
      gfaApi.middleware,
      layoutApi.middleware,
      phenoApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// Use throughout app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
