import React from "react";

import MainNavbar from "../../MainNavbar";

export default function Masthead({
  isSignedIn,
  handleSignIn,
  handleSignOut,
  handleShowAddBookmark
}) {
  return (
    <header>
      <MainNavbar
        isSignedIn={isSignedIn}
        handleSignIn={handleSignIn}
        handleSignOut={handleSignOut}
        handleShowAddBookmark={handleShowAddBookmark}
      />
    </header>
  );
}
