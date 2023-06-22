import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  GRID_SIZE: 50,
  selectedTool: "wall",
  selectedModel: "",
  selectedPoint: { x: null, y: null },
  currentAction: "wall",
};

const editor = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setTool(state, action) {
      state.selectedTool = action.payload;
    },
    setAction(state, action) {
      state.currentAction = action.payload;
    },
    setSelectedModel(state, action) {
      state.selectedModel = action.payload;
    },
    setSelectedPoint(state, action) {
      state.selectedPoint = action.payload;
    },
    setGridSize(state, action) {
      state.GRID_SIZE = action.payload;
    },
  },
});

export const {
  setAction,
  setGridSize,
  setSelectedModel,
  setSelectedPoint,
  setTool,
} = editor.actions;
export default editor.reducer;
