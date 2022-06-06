import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ParticleExplosion } from "../mcTypes";
import { HYDRATE } from "next-redux-wrapper";

export interface ParticleExplosionsState {
  particleExplosions: ParticleExplosion[];
}

const NUM_EXPLOSIONS = 200;

const getInitialExplosions = (): ParticleExplosion[] => {
  let explosions: ParticleExplosion[] = [];
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
  particleExplosions: getInitialExplosions(),
};

export const particleExplosionsSlice = createSlice({
  name: "particleExplosions",
  initialState,
  reducers: {
    activateParticleExplosion: (
      state: ParticleExplosionsState,
      action: PayloadAction<Omit<ParticleExplosion, "id" | "isActive">>
    ) => {
      const index = state.particleExplosions.findIndex(
        (explosion) => !explosion.isActive
      );

      state.particleExplosions[index] = {
        ...state.particleExplosions[index],
        ...action.payload,
        isActive: true,
      };
    },
    resetParticleExplosion: (
      state: ParticleExplosionsState,
      action: PayloadAction<string>
    ) => {
      const index = parseInt(action.payload, 10);
      state.particleExplosions[index].position = [0, 0, 0];
      state.particleExplosions[index].isActive = false;
    },
  },
  extraReducers: {
    [HYDRATE]: (
      state: ParticleExplosionsState,
      action: PayloadAction<{ subject: ParticleExplosionsState }>
    ) => {
      console.log("HYDRATE", state, action.payload);
      return {
        ...state,
        ...action.payload.subject,
      };
    },
  },
});

export const { activateParticleExplosion, resetParticleExplosion } =
  particleExplosionsSlice.actions;

export default particleExplosionsSlice.reducer;
