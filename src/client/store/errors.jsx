import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loadFloorplanError: false,
  loadedFloorplan: false,
};

const errorsSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    setLoadFloorplanError(state, action) {
      state.loadFloorplanError = action.payload;
    },
    setLoadedFloorplan(state, action) {
      state.loadedFloorplan = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setLoadFloorplanError, setLoadedFloorplan } =
  errorsSlice.actions;

export default errorsSlice.reducer;
