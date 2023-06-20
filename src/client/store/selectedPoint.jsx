import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  x: null,
  y: null
};

export const setSelectedPoint = createAsyncThunk('setSelectedPoint', async(payload)=>{
  return payload;
})

const selectedPoint = createSlice({
  name: "selectedPoint",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setSelectedPoint.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default selectedPoint.reducer;