import bookmarksHelper from "./bookmarkHelpers";
import mockBookmarksHelper from "./__mocks__/bookmarkHelpers";

export default ({ getFile, putFile }, offlineMode) => {
  if (offlineMode) {
    console.log("*** using offline mode ***");
    return mockBookmarksHelper();
  }

  return bookmarksHelper({ getFile, putFile });
};
