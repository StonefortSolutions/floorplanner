import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import examples from "./examples";

const store = configureStore({
  reducer: {
    examples,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "./examples";
