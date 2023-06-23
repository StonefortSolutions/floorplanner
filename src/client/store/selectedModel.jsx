import { createSlice } from "@reduxjs/toolkit";
const initialState = '';

const selectedModel = createSlice({
  name: "selectedModel",
  initialState,
  reducers: {
    setModel(state, action){
      return action.payload;
    }
  },
});

export const {setModel} = selectedModel.actions
export default selectedModel.reducer;