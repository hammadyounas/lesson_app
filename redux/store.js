import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from './storage';
import outlinesReducer from '../redux/slices/outlineSlice';
import resourcesReducer from '../redux/slices/resourceSlice';
import userReducer from '../redux/slices/userSlice';
import coursesReducer from '../redux/slices/courseSlice';

// Redux Persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

// Create a persisted reducer
const rootReducer = combineReducers({
  courses: coursesReducer,
  outlines: outlinesReducer,
  resources: resourcesReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
