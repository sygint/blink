/* eslint-disable react/jsx-filename-extension */
import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";

import bookmarksHelper from "./api/bookmarkHelpers";
import mockBookmarksHelper from "./__mocks__/bookmarkHelpers";

import blockstack from "./api/blockstack";
import theme from "./theme";
import App from "./components/5-Environments/App";

let bookmarkApi;

const offlineMode = process.env.REACT_APP_OFFLINE === "true";
const { userSession } = blockstack(offlineMode);

window.userSession = userSession;

if (offlineMode) {
  console.log("*** using offline mode ***");
  bookmarkApi = mockBookmarksHelper();
} else {
  bookmarkApi = bookmarksHelper(userSession);
}

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
