import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = '';

export const createScene = createAsyncThunk('createScene', async(payload)=>{
  return payload;
})

export const saveScene = createAsyncThunk('saveScene', async(payload)=>{
  console.log(payload);
  window.localStorage.setItem('scene',JSON.stringify(payload))
})

export const addToScene = createAsyncThunk('addToScene', async(payload)=>{
  return payload;
})

export const loadScene = createAsyncThunk('loadScene', async() => {
  const scene = window.localStorage.getItem('scene');
  return JSON.parse(scene);
})

const scene = createSlice({
  name: "scene",
  initialState,
  reducers: {
    deleteFromScene(state,action){
      return state.filter((item)=>{return item.id !== action.payload})
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createScene.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addToScene.fulfilled, (state,action) => {
      if(state === null){
        return [action.payload]
      }
      return [...state,action.payload];
    });
    builder.addCase(loadScene.fulfilled, (state,action) => {
      return action.payload;
    })
  },
});

export const {deleteFromScene} = scene.actions

export default scene.reducer;