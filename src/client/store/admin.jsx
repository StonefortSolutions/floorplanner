import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  user: {},
  loading: false,
  error: null,
  subscriptions: [],
  subscription: {},
  floorplans: [],
  floorplan: {},
  templates: [],
  template: {},
};

export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
  const response = await axios.get("/api/admin/users");
  return response.data;
});

const admin = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export const {} = admin.actions;
export default admin.reducer;
