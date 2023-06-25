import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  GRID_SIZE: 100,
  GRID_VISIBLE: true,
  COLOR_GRID: 0xffffff,
  COLOR_CENTER_LINE: 0xffffff,
};

const grid = createSlice({
  name: "grid",
  initialState,
  reducers: {
    setGridSize(state, action) {
      state.GRID_SIZE = action.payload;
    },
    setGridVisible(state, action) {
      state.GRID_VISIBLE = action.payload;
    },
    setGridColor(state, action) {
      state.COLOR_GRID = action.payload;
    },
    setGridLineColor(state, action) {
      state.COLOR_CENTER_LINE = action.payload;
    },
  },
});

export const { setGridSize, setGridVisible, setGridColor, setGridLineColor } =
  grid.actions;
export default grid.reducer;
