import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  user: {},
  stats: {
    users: 0,
    subscriptions: 0,
    floorplans: 0,
    templates: 0,
    last5Users: [],
  },
  loading: false,
  error: null,
  subscriptions: [],
  subscription: {},
  floorplans: [],
  floorplan: {},
  templates: [],
  template: {},
};

export const fetchStats = createAsyncThunk("fetchStats", async () => {
  const response = await axios.get("/api/admin/stats");
  return response.data;
});

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
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(fetchStats.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchStats.fulfilled, (state, action) => {
      state.loading = false;
      state.stats = action.payload;
    });
    builder.addCase(fetchStats.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
  },
});

export const {} = admin.actions;
export default admin.reducer;
