import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loadFloorplanError: false,
};

const errorsSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    setLoadFloorplanError(state, action) {
      state.loadFloorplanError = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setLoadFloorplanError } = errorsSlice.actions;

export default errorsSlice.reducer;
