import { configureStore } from "@reduxjs/toolkit";
import explosionsReducer from "./explosionsSlice";
import incomingProjectilesReducer from "./incomingProjectilesSlice";
import interceptorsReducer from "./interceptorsSlice";
import mcMouseIndicatorReducer from "./mcMouseIndicatorSlice";
import launchers from "./launchersSlice";

export const missileCommandStore = configureStore({
  reducer: {
    explosionsState: explosionsReducer,
    incomingProjectilesState: incomingProjectilesReducer,
    interceptorsState: interceptorsReducer,
    mcMouseIndicatorState: mcMouseIndicatorReducer,
    launchersState: launchers,
  },
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type MissileCommandRootState = ReturnType<
  typeof missileCommandStore.getState
>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type MissileCommandAppDispatch = typeof missileCommandStore.dispatch;