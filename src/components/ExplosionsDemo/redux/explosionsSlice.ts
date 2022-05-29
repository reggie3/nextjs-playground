import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Explosion } from "../explosionsTypes";
import { HYDRATE } from "next-redux-wrapper";
import { Vector3 } from "three";

export interface ExplosionsState {
  explosions: Explosion[];
}

const NUM_EXPLOSIONS = 200;

const getInitialExplosions = (): Explosion[] => {
  let explosions: Explosion[] = [];
  for (let i = 0; i < NUM_EXPLOSIONS; i++) {
    explosions.push({
      id: `${i}`,
      position: [0, 0, 0],
      createdAtSeconds: 0,
      isActive: false,
    });
  }
  return explosions;
};

const initialState = {
  explosions: getInitialExplosions(),
};

export const explosionsSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    activateExplosion: (
      state: ExplosionsState,
      action: PayloadAction<Omit<Explosion, "id" | "isActive">>
    ) => {
      const index = state.explosions.findIndex(
        (explosion) => !explosion.isActive
      );

      state.explosions[index] = {
        ...state.explosions[index],
        ...action.payload,
        isActive: true,
      };
    },
    resetExplosion: (state: ExplosionsState, action: PayloadAction<string>) => {
      const index = parseInt(action.payload, 10);
      state.explosions[index].position = [0, 0, 0];
      state.explosions[index].isActive = false;
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

export const { activateExplosion, resetExplosion } = explosionsSlice.actions;

export default explosionsSlice.reducer;
