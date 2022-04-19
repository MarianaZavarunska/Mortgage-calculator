import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { setUpStore } from "./store/store";
import "./index.css";

const storeConfig = setUpStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={storeConfig}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
