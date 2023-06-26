import { createSlice } from "@reduxjs/toolkit";
const initialState = 0;

const rotation = createSlice({
  name: "rotation",
  initialState,
  reducers: {
    rotate(state, action){
      return state + action.payload;
    }
  },
});

export const {rotate} = rotation.actions
export default rotation.reducer;