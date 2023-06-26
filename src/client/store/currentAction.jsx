import { createSlice } from "@reduxjs/toolkit";
const initialState = 'orbit';

const currrentAction = createSlice({
  name: "currentAction",
  initialState,
  reducers: {
    setAction(state, action){
      return action.payload;
    }
  },
});

export const {setAction} = currrentAction.actions
export default currrentAction.reducer;