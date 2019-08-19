import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "bulma/css/bulma.css";

import { createStore } from "redux";
import { Provider } from "react-redux";
import navBarReducer from "../src/reducers/navBarReducer";

const store = createStore(
  navBarReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
