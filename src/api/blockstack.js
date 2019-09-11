import { AppConfig, UserSession } from "blockstack";

const appConfig = new AppConfig(["store_write", "publish_data"]);
const userSession = new UserSession({ appConfig });

export default offlineMode => {
  function isUserSignedIn() {
    if (userSession.isUserSignedIn() || offlineMode) {
      return true;
    }

    if (userSession.isSignInPending()) {
      userSession
        .handlePendingSignIn()
        .then(function handlePendingSignInCallback() {
          window.location = window.location.origin;
        });
      return false;
    }

    return false;
  }

  return {
    isUserSignedIn,
    userSession
  };
};
