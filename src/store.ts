import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import filesApi from './api/files';
import gfaApi from './api/gfa';
import phenoApi from './api/pheno';
import layoutApi from './api/layout';
import graphSettingsReducer from './slices/graphSettings';
import phenoReducer from './slices/pheno';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import bookmarksApi from './api/bookmarks';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    filesApi.reducerPath,
    gfaApi.reducerPath,
    layoutApi.reducerPath,
    phenoApi.reducerPath,
    bookmarksApi.reducerPath,
  ],
};

const reducers = combineReducers({
  graphSettings: graphSettingsReducer,
  pheno: phenoReducer,
  [filesApi.reducerPath]: filesApi.reducer,
  [gfaApi.reducerPath]: gfaApi.reducer,
  [layoutApi.reducerPath]: layoutApi.reducer,
  [phenoApi.reducerPath]: phenoApi.reducer,
  [bookmarksApi.reducerPath]: bookmarksApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      filesApi.middleware,
      gfaApi.middleware,
      layoutApi.middleware,
      phenoApi.middleware,
      bookmarksApi.middleware,
    ]),
});

let persistor = persistStore(store);

export { store, persistor };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
