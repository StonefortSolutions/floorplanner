import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import examples from "./examples";
import scene from "./scene";
import selectedPoint from "./selectedPoint";
import selectedModel from "./selectedModel";
import currentAction from "./currentAction";
import grid from "./grid";
import itemHistory from "./itemHistory";
import rotation from "./rotation";
import selectedColor from "./selectedColor";
import floorplan from "./floorplan";
import errors from "./errors";
import admin from "./admin";

const store = configureStore({
  reducer: {
    examples,
    scene,
    selectedPoint,
    selectedModel,
    currentAction,
    grid,
    itemHistory,
    rotation,
    selectedColor,
    floorplan,
    errors,
    admin,
  },
  //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "./examples";
export * from "./scene";
export * from "./selectedPoint";
export * from "./selectedModel";
export * from "./currentAction";
export * from "./grid";
export * from "./itemHistory";
export * from "./rotation";
export * from "./selectedColor";
export * from "./floorplan";
export * from "./errors";
export * from "./admin";
