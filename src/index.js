import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider, createTheme } from "@mui/material";
import { Provider } from "react-redux";
import {
  // legacy_createStore as createStore,
  applyMiddleware,
  compose,
  legacy_createStore,
} from "redux";
import thunk from "redux-thunk";

import "./index.css";
import reducers from "./reducers";

const store = legacy_createStore(reducers, compose(applyMiddleware(thunk)));

const theme = createTheme();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);

reportWebVitals();
