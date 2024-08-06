import { combineReducers, configureStore, createStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './reducers/auth';
import { authApi } from './rtk-query/authApi';

const rootPersistConfig = {
  key: 'root',
  storage
};

const authPersistConfig = {
  key: 'auth',
  storage
};

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  auth: persistReducer(authPersistConfig, authReducer)
});

const persistedReducers = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false
    }).concat(authApi.middleware)
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
