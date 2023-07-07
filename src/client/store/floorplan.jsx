import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { loadScene } from "./scene";
import { setLoadFloorplanError, setLoadedFloorplan } from "./errors";

const initialState = {
  floorplans: Array(0),
  singleFloorplan: null,
  pendingSave: false,
  isLoaded: false,
  floorplansIsLoaded: false,
  error: false,
};

//create floorplan
export const createFloorplan = createAsyncThunk("createFloorplan", async () => {
  try {
    const { data } = await axios.post("/api/floorplan");
    return data;
  } catch (error) {
    console.log(error);
  }
});

//update floorplan

export const saveFloorplan = createAsyncThunk(
  "saveFloorplan",
  async (payload, { dispatch }) => {
    try {
      const { data } = await axios.put(`/api/floorplan/${payload.id}`, payload);
      dispatch(updatePendingSave(false));
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

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
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/floorplan/${id}`);
      if (!data || data === null || data === undefined) {
        dispatch(setLoadFloorplanError(true));
        return rejectWithValue("No floorplan found");
      }
      if (data.scene) {
        dispatch(loadScene(data.scene));
      }
      dispatch(setLoadedFloorplan(true));
      return data;
    } catch (error) {
      dispatch(setLoadFloorplanError(true));
      return rejectWithValue("No floorplan found");
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
    updatePendingSave(state, action) {
      state.pendingSave = action.payload;
    },
    updateFloorplanData(state, action) {
      if (action.payload.scene) {
        if (
          state.singleFloorplan?.scene?.length < action.payload?.scene?.length
        ) {
          state.pendingSave = true;
        }
        if (state.singleFloorplan) {
          state.singleFloorplan.scene = action.payload.scene;
        }
      }
      if (action.payload.previewImage) {
        state.singleFloorplan.previewImage = action.payload.previewImage;
      }
      if (action.payload.name) {
        state.singleFloorplan.name = action.payload.name;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFloorplans.pending, (state, action) => {
      state.floorplansIsLoaded = false;
    });
    builder.addCase(fetchFloorplans.fulfilled, (state, action) => {
      state.floorplans = action.payload;
      state.floorplansIsLoaded = true;
    });
    builder.addCase(fetchSingleFloorplan.fulfilled, (state, action) => {
      state.isLoaded = true;
      state.singleFloorplan = action.payload;
    });
    builder.addCase(fetchSingleFloorplan.rejected, (state, action) => {
      state.isLoaded = false;
      state.error = true;
      state.singleFloorplan = null;
    });
    builder.addCase(deleteSingleFloorplan.fulfilled, (state, action) => {
      state.floorplans = state.floorplans.filter(
        (floorplan) => floorplan.id !== action.payload.id
      );
    });
    builder.addCase(createFloorplan.fulfilled, (state, action) => {
      state.singleFloorplan = action.payload;
      state.isLoaded = true;
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

export const {
  updateScene,
  updateScreenshot,
  updateFloorplanData,
  updatePendingSave,
} = floorplanSlice.actions;

export default floorplanSlice.reducer;
