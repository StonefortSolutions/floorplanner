import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import examples from "./examples";
import selectedPoint from "./selectedPoint";
import scene from "./scene";
import currentAction from "./currentAction";

const store = configureStore({
  reducer: {
    examples,
    selectedPoint,
    scene,
    currentAction
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "./examples";
