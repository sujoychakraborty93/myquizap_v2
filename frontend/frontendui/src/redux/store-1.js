import { configureStore } from '@reduxjs/toolkit';
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
import userReducer from './userSlice';
import questionsReducer from './questionsSlice';
import topicsReducer from './topicsSlice';
import regionsReducer from './regionsSlice';

export const store = configureStore({
  reducer: {
    userStore: userReducer,
    questionsStore: questionsReducer,
    topicsStore: topicsReducer,
    regionsStore: regionsReducer,
  },
});