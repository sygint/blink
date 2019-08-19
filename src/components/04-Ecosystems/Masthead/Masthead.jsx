import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import MainNavbar from "../MainNavbar";

const Header = styled.header`
  position: fixed;
  z-index: 500;
  width: 100%;
`;

function Masthead({ handleSignOut, handleShowAddBookmark }) {
  return (
    <Header>
      <MainNavbar
        handleSignOut={handleSignOut}
        handleShowAddBookmark={handleShowAddBookmark}
      />
    </Header>
  );
}

Masthead.propTypes = {
  handleSignOut: PropTypes.func.isRequired,
  handleShowAddBookmark: PropTypes.func.isRequired
};

export default Masthead;
