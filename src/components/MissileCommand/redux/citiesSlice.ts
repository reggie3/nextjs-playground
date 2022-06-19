import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CityData } from "../mcTypes";
import { HYDRATE } from "next-redux-wrapper";

export interface CitiesState {
  cities: Record<string, CityData>;
}

const initialState = {
  cities: {},
};

export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    addCity: (state: CitiesState, action: PayloadAction<CityData>) => {
      state.cities[action.payload.id] = action.payload;
    },
    removeCity: (state: CitiesState, action: PayloadAction<string>) => {
      const cityId = action.payload;
      delete state.cities[cityId];
    },
    setCities: (
      state: CitiesState,
      action: PayloadAction<Record<string, CityData>>
    ) => {
      state.cities = action.payload;
    },
    updateCityHealth: (
      state: CitiesState,
      action: PayloadAction<{ id: string; health: number }>
    ) => {
      state.cities[action.payload.id].health = action.payload.health;
    },
  },
  extraReducers: {
    [HYDRATE]: (
      state: CitiesState,
      action: PayloadAction<{ subject: CitiesState }>
    ) => {
      console.log("HYDRATE", state, action.payload);
      return {
        ...state,
        ...action.payload.subject,
      };
    },
  },
});

export const { addCity, removeCity, setCities, updateCityHealth } =
  citiesSlice.actions;

export default citiesSlice.reducer;
