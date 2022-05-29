import { configureStore } from "@reduxjs/toolkit";
import explosions from "./explosionsSlice";

export const explosionsStore = configureStore({
  reducer: {
    explosionsState: explosions,
  },
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type ExplosionsRootState = ReturnType<typeof explosionsStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type ExplosionsAppDispatch = typeof explosionsStore.dispatch;
