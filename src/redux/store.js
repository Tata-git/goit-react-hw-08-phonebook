import { configureStore } from '@reduxjs/toolkit'; // getDefaultMiddleware
// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import { contactApi, contactsSlice } from './contactApi';
import {
  persistStore,
  persistReducer,
  // FLUSH,
  // REHYDRATE,
  // PAUSE,
  // PERSIST,
  // PURGE,
  // REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSliceReducer from './auth/authSlice'; // authSlice.reducer

// const middleware = [
//   ...getDefaultMiddleware({
//     serializableCheck: {
//       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//     },
//   }),
//   contactApi.middleware,
// ];

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authSliceReducer),
    [contactApi.reducerPath]: contactApi.reducer,
    [contactsSlice.name]: contactsSlice.reducer,
  },
  // middleware,
  // middleware(getDefaultMiddleware) {
  //   return (
  //     getDefaultMiddleware({
  //       serializableCheck: {
  //         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //       },
  //     }),
  //     contactApi.middleware
  //   );
  // },
  // middleware: getDefaultMiddleware => [
  //   ...getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),
  //   contactApi.middleware,
  // ],
});
export const persistor = persistStore(store);
