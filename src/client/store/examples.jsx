import { useAuth0 } from "@auth0/auth0-react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  examples: [],
};

export const fetchExamples = createAsyncThunk(
  "fetchExamples",
  async (token) => {
    const response = await fetch("/api/auth", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  }
);

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
