import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IncomingProjectile } from "../mcTypes";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

export interface IncomingProjectilesState {
  incomingProjectiles: Record<string, IncomingProjectile>;
}

const initialState = {
  incomingProjectiles: {} as Record<string, IncomingProjectile>,
};

export const incomingProjectilesSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addIncomingProjectile: (
      state: IncomingProjectilesState,
      action: PayloadAction<IncomingProjectile>
    ) => {
      state.incomingProjectiles[action.payload.id] = action.payload;
    },

    removeIncomingProjectile: (
      state: IncomingProjectilesState,
      action: PayloadAction<string>
    ) => {
      const incomingProjectileId = action.payload;
      delete state.incomingProjectiles[incomingProjectileId];
    },
  },
  extraReducers: {
    [HYDRATE]: (
      state: IncomingProjectilesState,
      action: PayloadAction<{ subject: IncomingProjectilesState }>
    ) => {
      console.log("HYDRATE", state, action.payload);
      return {
        ...state,
        ...action.payload.subject,
      };
    },
  },
});

export const { addIncomingProjectile, removeIncomingProjectile } =
  incomingProjectilesSlice.actions;

export default incomingProjectilesSlice.reducer;
