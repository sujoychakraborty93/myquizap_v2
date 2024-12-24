// src/features/regions/regionsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  regions: [],
  selectedRegions: [],
};

const regionsSlice = createSlice({
  name: 'regions',
  initialState,
  reducers: {
    setRegions: (state, action) => {
      state.regions = action.payload;
    },
    toggleRegion: (state, action) => {
      const region = action.payload;
      if (state.selectedRegions.includes(region)) {
        state.selectedRegions = state.selectedRegions.filter((r) => r !== region);
      } else {
        state.selectedRegions.push(region);
      }
    },
  },
});

export const { setRegions, toggleRegion } = regionsSlice.actions;

export default regionsSlice.reducer;
