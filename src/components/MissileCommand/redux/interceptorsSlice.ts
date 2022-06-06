import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Interceptor } from "../mcTypes";
import { HYDRATE } from "next-redux-wrapper";

export interface InterceptorsState {
  interceptors: Record<string, Interceptor>;
}

const initialState = {
  interceptors: {},
};

export const interceptorsSlice = createSlice({
  name: "interceptors",
  initialState,
  reducers: {
    addInterceptor: (
      state: InterceptorsState,
      action: PayloadAction<Interceptor>
    ) => {
      state.interceptors[action.payload.id] = action.payload;
    },
    removeInterceptor: (
      state: InterceptorsState,
      action: PayloadAction<string>
    ) => {
      const interceptorId = action.payload;
      delete state.interceptors[interceptorId];
    },
  },
  extraReducers: {
    [HYDRATE]: (
      state: InterceptorsState,
      action: PayloadAction<{ subject: InterceptorsState }>
    ) => {
      console.log("HYDRATE", state, action.payload);
      return {
        ...state,
        ...action.payload.subject,
      };
    },
  },
});

export const { addInterceptor, removeInterceptor } = interceptorsSlice.actions;

export default interceptorsSlice.reducer;
