import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IncomingProjectile } from "../mcTypes";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

export type IncomingProjectileStatus =
  | "active"
  | "intercepted"
  | "destroyed"
  | "dead";
export interface IncomingProjectilesState {
  incomingProjectiles: Record<string, IncomingProjectile>;
}

const initialState = {
  incomingProjectiles: {} as Record<string, IncomingProjectile>,
};

export const incomingProjectilesSlice = createSlice({
  name: "incomingProjectiles",
  initialState,
  reducers: {
    addIncomingProjectile: (
      state: IncomingProjectilesState,
      action: PayloadAction<IncomingProjectile>
    ) => {
      state.incomingProjectiles[action.payload.id] = action.payload;
    },
    updateProjectile: (
      state: IncomingProjectilesState,
      action: PayloadAction<{ id: string; update: Partial<IncomingProjectile> }>
    ) => {
      const { id, update } = action.payload;
      if (state.incomingProjectiles[id]) {
        state.incomingProjectiles[id] = {
          ...state.incomingProjectiles[id],
          ...update,
        };
      }
    },
    updateProjectileStatus: (
      state: IncomingProjectilesState,
      action: PayloadAction<{ id: string; status: IncomingProjectileStatus }>
    ) => {
      const { id, status } = action.payload;
      // check to see if the projectile is exists before attempting to update it
      if (state.incomingProjectiles[id]) {
        state.incomingProjectiles[id].status = status;
      }
    },
    removeIncomingProjectile: (
      state: IncomingProjectilesState,
      action: PayloadAction<string>
    ) => {
      const incomingProjectileId = action.payload;
      delete state.incomingProjectiles[incomingProjectileId];
    },
    markProjectileAsIntercepted: (
      state: IncomingProjectilesState,
      action: PayloadAction<string>
    ) => {
      const id = action.payload;

      if (state.incomingProjectiles[id]) {
        state.incomingProjectiles[id].status = "intercepted";
      }
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

export const {
  addIncomingProjectile,
  removeIncomingProjectile,
  updateProjectile,
  updateProjectileStatus,
  markProjectileAsIntercepted,
} = incomingProjectilesSlice.actions;

export default incomingProjectilesSlice.reducer;
