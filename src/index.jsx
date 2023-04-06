import React from "react";
import { createRoot } from "react-dom/client";
/* Принимает store */
import { Provider } from "react-redux";
/* Импортируем чтобы передать в Provider */
import { store } from "./components/reducers";
import App from "./components/App";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
