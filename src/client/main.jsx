import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import "./index.css";
import { Provider } from "react-redux";
import ClerkProviderWithRoutes from "./router";

const clerkPubKey = "pk_test_ZnJlc2gtbW9sbHktNDguY2xlcmsuYWNjb3VudHMuZGV2JA";

//Clerk Vite production bugfix
if (
  typeof global === "undefined" &&
  typeof window !== "undefined" &&
  !window.global
) {
  window.global = window;
}

//dark mode
if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  //<React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <ClerkProviderWithRoutes publishableKey={clerkPubKey} />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);
