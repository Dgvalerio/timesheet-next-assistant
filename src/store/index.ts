import ui from '@/store/ui/slice';
import user from '@/store/user/slice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { persistReducer, persistStore } from 'redux-persist';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistedReducer = persistReducer(
  {
    key: 'timesheet-next-assistant',
    storage,
    whitelist: ['user', 'ui'],
    version: 1,
    migrate: (state) => {
      if (<RootState>state) {
        if ((<RootState>state).ui) {
          if (typeof (<RootState>state).ui.loading === 'boolean') {
            (<RootState>state).ui.loading = [];
          }
        }
      }

      return Promise.resolve(state);
    },
  },
  combineReducers({ user, ui })
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const toPersist = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export { store, toPersist };
