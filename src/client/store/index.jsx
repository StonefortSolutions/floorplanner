import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import examples from "./examples";
import scene from "./scene";
import editor from "./editor";

const store = configureStore({
  reducer: {
    examples,
    scene,
    editor,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "./examples";
export * from "./scene";
export * from "./editor";
