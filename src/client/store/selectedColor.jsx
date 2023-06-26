import { createSlice } from "@reduxjs/toolkit";
const initialState = '#5e461f';

const selectedColor = createSlice({
  name: "selectedColor",
  initialState,
  reducers: {
    setColor(state,action){
      return action.payload
    }
  },
});

export const {setColor} = selectedColor.actions
export default selectedColor.reducer;