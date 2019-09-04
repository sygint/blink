import React from "react";
import PropTypes from "prop-types";

import { Header } from "./styles";
import Navbar from "../Navbar";

export default function Masthead({
  onClickSignOut,
  onClickAdd,
  onClickMenu,
  isSidebarVisible
}) {
  return (
    <Header>
      <Navbar
        onClickSignOut={onClickSignOut}
        onClickAdd={onClickAdd}
        onClickMenu={onClickMenu}
        isSidebarVisible={isSidebarVisible}
      />
    </Header>
  );
}

Masthead.propTypes = {
  onClickSignOut: PropTypes.func.isRequired,
  onClickAdd: PropTypes.func.isRequired,
  onClickMenu: PropTypes.func.isRequired,
  isSidebarVisible: PropTypes.bool.isRequired
};
