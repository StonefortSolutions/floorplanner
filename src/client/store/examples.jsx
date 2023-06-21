import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  examples: [],
};

export const fetchExamples = createAsyncThunk("fetchExamples", async () => {
  const response = await fetch("/api/auth");
  return await response.json();
});

const examplesSlice = createSlice({
  name: "examples",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchExamples.fulfilled, (state, action) => {
      state.examples = action.payload;
    });
  },
});

export default examplesSlice.reducer;
