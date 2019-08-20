import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import MainNavbar from "../MainNavbar";

const Header = styled.header`
  position: fixed;
  z-index: 500;
  width: 100%;
`;

function Masthead({ onClickSignOut, onClickAdd }) {
  return (
    <Header>
      <MainNavbar onClickSignOut={onClickSignOut} onClickAdd={onClickAdd} />
    </Header>
  );
}

Masthead.propTypes = {
  onClickSignOut: PropTypes.func.isRequired,
  onClickAdd: PropTypes.func.isRequired
};

export default Masthead;
