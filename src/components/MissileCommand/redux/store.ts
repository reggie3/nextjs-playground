import { configureStore } from "@reduxjs/toolkit";
import explosionsReducer from "./explosionsSlice";
import incomingProjectilesReducer from "./incomingProjectilesSlice";
import interceptorsReducer from "./interceptorsSlice";
import mcMouseIndicatorReducer from "./mcMouseIndicatorSlice";
import launchersReducer from "./launchersSlice";
import particleExplosionsSliceReducer from "./particleExplosionsSlice";
import gameDataSliceReducer from "./gameDataSlice";
import citiesReducer from "./citiesSlice";

export const missileCommandStore = configureStore({
  reducer: {
    citiesState: citiesReducer,
    explosionsState: explosionsReducer,
    incomingProjectilesState: incomingProjectilesReducer,
    interceptorsState: interceptorsReducer,
    mcMouseIndicatorState: mcMouseIndicatorReducer,
    launchersState: launchersReducer,
    particleExplosionsState: particleExplosionsSliceReducer,
    gameDataState: gameDataSliceReducer,
  },
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type MissileCommandRootState = ReturnType<
  typeof missileCommandStore.getState
>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type MissileCommandAppDispatch = typeof missileCommandStore.dispatch;
