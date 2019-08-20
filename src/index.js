/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { ThemeProvider } from "styled-components";
import ReactDOM from "react-dom";

import theme from "./theme";
import App from "./components/5-Environments/App";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
