import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  floorplans: Array(0),
  singleFloorplan: {
    id: 0,
    name: "",
    scene: [],
    createdAt: "",
    updatedAt: "",
    userId: 0,
    previewImage: "",
    isPublic: false,
    isTemplate: false,
  },
};

//create floorplan
export const createFloorplan = createAsyncThunk(
  "createFloorplan",
  async (payload) => {
    console.log("CREATING NEW FLOORPLAN");

    return floorplanId;
  }
);

//update floorplan

//update scene on floorplan
//update preview image on floorplan
//update name on floorplan

export const fetchFloorplans = createAsyncThunk("fetchFloorplans", async () => {
  try {
    const { data } = await axios.get("/api/floorplan");
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchSingleFloorplan = createAsyncThunk(
  "fetchSingleFloorplan",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/floorplan/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteSingleFloorplan = createAsyncThunk(
  "deleteSingleFloorplan",
  async (id) => {
    try {
      const { data } = await axios.delete(`/api/floorplan${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const floorplanSlice = createSlice({
  name: "floorplan",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFloorplans.fulfilled, (state, action) => {
      state.floorplans = action.payload;
    });
    builder.addCase(fetchSingleFloorplan.fulfilled, (state, action) => {
      state.singleFloorplan = action.payload;
    });
    builder.addCase(deleteSingleFloorplan.fulfilled, (state, action) => {
      state.singleFloorplan = action.payload;
    });
  },
});

export default floorplanSlice.reducer;
