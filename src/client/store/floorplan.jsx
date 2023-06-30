import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  floorplans: Array(0),
  singleFloorplan: null,
};

//create floorplan
export const createFloorplan = createAsyncThunk("createFloorplan", async () => {
  console.log("CREATING NEW FLOORPLAN");
  const { data } = await axios.post("/api/floorplan");
  return data;
});

//update floorplan

export const saveFloorplan = createAsyncThunk(
  "saveFloorplan",
  async (payload) => {
    try {
      const { data } = await axios.put(`/api/floorplan/${payload.id}`, payload);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

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
      const { data } = await axios.delete(`/api/floorplan/${id}`);
      console.log("DATA", data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const floorplanSlice = createSlice({
  name: "floorplan",
  initialState,
  reducers: {
    updateScene(state, action) {
      state.singleFloorplan.scene = action.payload;
    },
    updateScreenshot(state, action) {
      state.singleFloorplan.previewImage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFloorplans.fulfilled, (state, action) => {
      state.floorplans = action.payload;
    });
    builder.addCase(fetchSingleFloorplan.fulfilled, (state, action) => {
      state.singleFloorplan = action.payload;
    });
    builder.addCase(deleteSingleFloorplan.fulfilled, (state, action) => {
      state.floorplans = state.floorplans.filter(
        (floorplan) => floorplan.id !== action.payload.id
      );
    });
    builder.addCase(createFloorplan.fulfilled, (state, action) => {
      state.singleFloorplan = action.payload;
      state.floorplans = [action.payload, ...state.floorplans];
    });
    builder.addCase(saveFloorplan.fulfilled, (state, action) => {
      state.floorplans = state.floorplans.map((floorplan) => {
        if (floorplan.id === action.payload.id) {
          return action.payload;
        } else {
          return floorplan;
        }
      });
    });
  },
});

export const { updateScene, updateScreenshot } = floorplanSlice.actions;

export default floorplanSlice.reducer;
