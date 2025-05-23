import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  temperatureUnit: "Celsius",
  selectedCategories: [],
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTemperatureUnit: (state, action) => {
      state.temperatureUnit = action.payload;
    },
    setSelectedCategories: (state, action) => {
      state.selectedCategories = action.payload;
    },
  },
});
export const { setTemperatureUnit, setSelectedCategories } =
  settingsSlice.actions;
export default settingsSlice.reducer;
