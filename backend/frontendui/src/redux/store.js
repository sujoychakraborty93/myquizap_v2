import { configureStore, combineReducers } from '@reduxjs/toolkit';
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
import userReducer, { logout } from './userSlice';
import questionsReducer from './questionsSlice';
import topicsReducer from './topicsSlice';
import regionsReducer from './regionsSlice';

// =========================
// Create the app reducer
const appReducer = combineReducers({
  userStore: userReducer,
  questionsStore: questionsReducer,
  topicsStore: topicsReducer,
  regionsStore: regionsReducer,
});

// Create the root reducer
const rootReducer = (state, action) => {
  if (action.type === logout.type) {
    state = undefined;
  }
  return appReducer(state, action);
};

// Configuration for Redux Persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userStore', 'questionsStore', 'topicsStore', 'regionsStore'], // Reducers you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer, () => {
  console.log('Rehydration Complete');
});

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
// =========================
// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['userStore'],
// };
// const persistedReducer = persistReducer(persistConfig, (state, action) => {
//   if (action.type === 'user/logout') {
//     state = undefined;
//   }
//   return rootReducer(state, action);
// });
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });
// export const persistor = persistStore(store);

// =========================
// export const store = configureStore({
//   reducer: {
//     userStore: userReducer,
//     questionsStore: questionsReducer,
//     topicsStore: topicsReducer,
//     regionsStore: regionsReducer,
//   },
// });