import React from "react";
import styled from "styled-components";

import MainNavbar from "../MainNavbar";

const Header = styled.header`
  position: fixed;
  z-index: 500;
  width: 100%;
`;

export default function Masthead({
  isSignedIn,
  handleSignIn,
  handleSignOut,
  handleShowAddBookmark
}) {
  return (
    <Header>
      <MainNavbar
        isSignedIn={isSignedIn}
        handleSignIn={handleSignIn}
        handleSignOut={handleSignOut}
        handleShowAddBookmark={handleShowAddBookmark}
      />
    </Header>
  );
}
