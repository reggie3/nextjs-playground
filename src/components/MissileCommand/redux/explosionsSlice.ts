import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Explosion } from "../mcTypes";
import { HYDRATE } from "next-redux-wrapper";

export interface ExplosionsState {
  explosions: Record<string, Explosion>;
}

const initialState = {
  explosions: {},
};

export const explosionsSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addExplosion: (
      state: ExplosionsState,
      action: PayloadAction<Explosion>
    ) => {
      state.explosions[action.payload.id] = action.payload;
    },
    removeExplosion: (
      state: ExplosionsState,
      action: PayloadAction<string>
    ) => {
      const explosionId = action.payload;
      delete state.explosions[explosionId];
    },
  },
  extraReducers: {
    [HYDRATE]: (
      state: ExplosionsState,
      action: PayloadAction<{ subject: ExplosionsState }>
    ) => {
      console.log("HYDRATE", state, action.payload);
      return {
        ...state,
        ...action.payload.subject,
      };
    },
  },
});

export const { addExplosion, removeExplosion } = explosionsSlice.actions;

export default explosionsSlice.reducer;
