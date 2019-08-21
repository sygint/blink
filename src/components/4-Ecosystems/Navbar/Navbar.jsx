import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Branding from "../../2-Molecules/Branding";
import IconButton from "../../2-Molecules/IconButton";

const StyledNav = styled.nav`
  align-items: center;
  background: #fff;
  border-bottom: 1px solid ${({ theme: { color } }) => color.third};
  box-sizing: border-box;
  display: flex;
  height: ${({ theme: { dimension } }) => dimension.mastheadHeight};
  justify-content: space-between;
  padding: 0 20px;
`;

const NavbarLeft = styled.div``;
const NavbarRight = styled.div`
  display: flex;

  > button:last-child::before {
    border-left: 1px solid ${({ theme: { color } }) => color.icon};
    content: "";
    height: 35px;
    margin-right: 10px;
    margin-left: 5px;
  }
`;

function Navbar({ onClickSignOut, onClickAdd }) {
  return (
    <StyledNav>
      <NavbarLeft>
        <IconButton icon="Menu" />
      </NavbarLeft>

      <Branding linkTo="/" />

      <NavbarRight>
        <IconButton icon="Add" onClick={onClickAdd} />
        <IconButton icon="LogOut" onClick={onClickSignOut} />
      </NavbarRight>
    </StyledNav>
  );
}

Navbar.propTypes = {
  onClickSignOut: PropTypes.func.isRequired,
  onClickAdd: PropTypes.func.isRequired
};

export default Navbar;
