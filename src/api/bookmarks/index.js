import bookmarksHelper from "./bookmarkHelpers";
import mockBookmarksHelper from "./__mocks__/bookmarkHelpers";

export default (userSession, offlineMode) => {
  if (offlineMode) {
    console.log("*** using offline mode ***");
    return mockBookmarksHelper();
  }

  return bookmarksHelper(userSession);
};
