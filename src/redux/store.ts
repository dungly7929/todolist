
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './slice/slice'

const store = configureStore({
    reducer: {
      list: todoReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
  });


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;