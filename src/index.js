import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./context/Store";
import "./index.css";
import App from "./App";

const root = document.getElementById("root");

createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
);
