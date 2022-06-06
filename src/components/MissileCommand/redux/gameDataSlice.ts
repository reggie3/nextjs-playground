import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Launcher } from "../mcTypes";
import { HYDRATE } from "next-redux-wrapper";

export interface GameDataState {
  score: number;
}

const initialState = {
  score: 0,
};

export const gameDataSlice = createSlice({
  name: "gameData",
  initialState,
  reducers: {
    incrementScore: (state: GameDataState, action: PayloadAction<number>) => {
      state.score += action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (
      state: GameDataState,
      action: PayloadAction<{ subject: GameDataState }>
    ) => {
      console.log("HYDRATE", state, action.payload);
      return {
        ...state,
        ...action.payload.subject,
      };
    },
  },
});

export const { incrementScore } = gameDataSlice.actions;

export default gameDataSlice.reducer;
