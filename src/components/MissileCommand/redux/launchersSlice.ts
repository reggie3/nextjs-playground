import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Launcher } from "../mcTypes";
import { HYDRATE } from "next-redux-wrapper";

export interface LaunchersState {
  launchers: Record<string, Launcher>;
}

const initialState = {
  launchers: {},
};

export const launchersSlice = createSlice({
  name: "launchers",
  initialState,
  reducers: {
    addLauncher: (state: LaunchersState, action: PayloadAction<Launcher>) => {
      state.launchers[action.payload.id] = action.payload;
    },
    removeLauncher: (state: LaunchersState, action: PayloadAction<string>) => {
      const launcherId = action.payload;
      delete state.launchers[launcherId];
    },
  },
  extraReducers: {
    [HYDRATE]: (
      state: LaunchersState,
      action: PayloadAction<{ subject: LaunchersState }>
    ) => {
      console.log("HYDRATE", state, action.payload);
      return {
        ...state,
        ...action.payload.subject,
      };
    },
  },
});

export const { addLauncher, removeLauncher } = launchersSlice.actions;

export default launchersSlice.reducer;
