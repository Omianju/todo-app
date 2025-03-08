import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import themeReducer from './themeSlice';
import authReducer from './authSlice';
import tasksReducer from './tasksSlice';
import weatherReducer from './weatherSlice';

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  tasks: tasksReducer,
  weather: weatherReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'tasks', 'theme'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;