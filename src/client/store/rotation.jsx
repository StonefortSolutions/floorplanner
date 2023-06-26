import { createSlice } from "@reduxjs/toolkit";
const initialState = 0;

const rotation = createSlice({
  name: "rotation",
  initialState,
  reducers: {
    rotate(state, action){
      if(Math.abs(state + action.payload) > 6){
        return 0
      }else{
        return state + action.payload;
      }
      
    }
  },
});

export const {rotate} = rotation.actions
export default rotation.reducer;