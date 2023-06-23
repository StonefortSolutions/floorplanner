import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import examples from "./examples";
import scene from "./scene";
import selectedPoint from "./selectedPoint";
import selectedModel from "./selectedModel";
import currentAction from "./currentAction";
import editor from "./editor";

const store = configureStore({
  reducer: {
    examples,
    scene,
    selectedPoint,
    selectedModel,
    currentAction,
    editor,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "./examples";
export * from "./scene";
