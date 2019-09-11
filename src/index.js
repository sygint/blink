/* eslint-disable react/jsx-filename-extension */
import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";

import bookmarks from "./api/bookmarks";
import blockstack from "./api/blockstack";
import theme from "./theme";
import App from "./components/5-Environments/App";

const offlineMode = process.env.REACT_APP_OFFLINE === "true";
const { userSession } = blockstack(offlineMode);
const bookmarkApi = bookmarks(userSession, offlineMode);

window.userSession = userSession;

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App
      bookmarkApi={bookmarkApi}
      userSession={userSession}
      offlineMode={offlineMode}
    />
  </ThemeProvider>,
  document.getElementById("root")
);
