import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addUndoItem } from "./itemHistory";
import { updatePendingSave } from "./floorplan";
const initialState = [];

export const createScene = createAsyncThunk("createScene", async (payload) => {
  return payload;
});

export const saveScene = createAsyncThunk("saveScene", async (payload) => {
  console.log("SAVING DB");
  window.localStorage.setItem("scene", JSON.stringify(payload));
});

export const addToScene = createAsyncThunk(
  "addToScene",
  async (payload, { dispatch }) => {
    dispatch(updatePendingSave(true));
    return payload;
  }
);

export const loadScene = createAsyncThunk("loadScene", async (payload) => {
  if (payload) {
    return payload;
  } else {
    return [];
  }
});

const scene = createSlice({
  name: "scene",
  initialState,
  reducers: {
    deleteFromScene(state, action) {
      return state.filter((item) => {
        return item.id !== action.payload;
      });
    },
    undoLastAction(state, action) {
      const newScene = [...state];
      const lastItem = newScene.pop();
      addUndoItem(lastItem);
      return newScene;
    },
    saveLocalScene(state, action) {
      console.log("SAVING LOCAL STORAGE");
      window.localStorage.setItem("scene", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createScene.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addToScene.fulfilled, (state, action) => {
      if (state === null) {
        return [action.payload];
      }
      return [...state, action.payload];
    });
    builder.addCase(loadScene.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const {
  deleteFromScene,
  undoLastAction,
  saveLocalScene,
  testLoadScene,
} = scene.actions;

export default scene.reducer;
