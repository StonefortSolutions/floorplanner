import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import examples from "./examples";
import selectedPoint from "./selectedPoint";
import scene from "./scene";

const store = configureStore({
  reducer: {
    examples,
    selectedPoint,
    scene,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "./examples";
