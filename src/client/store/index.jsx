import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import examples from "./examples";
import selectedPoint from "./selectedPoint";

const store = configureStore({
  reducer: {
    examples,
    selectedPoint,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "./examples";
