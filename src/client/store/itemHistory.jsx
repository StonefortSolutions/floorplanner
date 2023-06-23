import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  undoItems: [],
  redoItems: [],
};

const itemHistory = createSlice({
  name: "itemHistory",
  initialState,
  reducers: {
    addUndoItem(state, action) {
      state.undoItems.push(action.payload);
    },
    removeLastUndoItem(state, action) {
      state.undoItems.pop();
    },
    addRedoItem(state, action) {
      state.redoItems.push(action.payload);
    },
    removeLastRedoItem(state, action) {
      state.redoItems.pop();
    },
  },
});

export const {
  addUndoItem,
  removeLastRedoItem,
  addRedoItem,
  removeLastUndoItem,
} = itemHistory.actions;
export default itemHistory.reducer;
