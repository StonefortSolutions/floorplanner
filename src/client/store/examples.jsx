import { useAuth0 } from "@auth0/auth0-react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  examples: [
    {
      id: 1,
      name: "Example 1",
    },
    {
      id: 2,
      name: "Example 2",
    },
  ],
};

const examplesSlice = createSlice({
  name: "examples",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default examplesSlice.reducer;
