import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export type McMouseIndicatorModes = "targeting" | "launcher_placement";

export interface mcMouseIndicatorState {
  indicatorMode: McMouseIndicatorModes;
}

const initialState = {
  indicatorMode: "targeting",
};

export const mcMouseIndicatorSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setIndicatorMode: (
      state: mcMouseIndicatorState,
      action: PayloadAction<McMouseIndicatorModes>
    ) => {
      state.indicatorMode = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (
      state: mcMouseIndicatorState,
      action: PayloadAction<{ subject: mcMouseIndicatorState }>
    ) => {
      console.log("HYDRATE", state, action.payload);
      return {
        ...state,
        ...action.payload.subject,
      };
    },
  },
});

export const { setIndicatorMode } = mcMouseIndicatorSlice.actions;

export default mcMouseIndicatorSlice.reducer;
