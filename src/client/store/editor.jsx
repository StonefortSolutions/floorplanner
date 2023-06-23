import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  GRID_SIZE: 50,
};

const editor = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setGridSize(state, action) {
      state.GRID_SIZE = action.payload;
    },
  },
});

export const {
  setGridSize,
} = editor.actions;
export default editor.reducer;
