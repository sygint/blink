import React from "react";
import PropTypes from "prop-types";

import { StyledNav, NavbarLeft, NavbarRight } from "./styles";
import Branding from "../../2-Molecules/Branding";
import IconButton from "../../2-Molecules/IconButton";

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
