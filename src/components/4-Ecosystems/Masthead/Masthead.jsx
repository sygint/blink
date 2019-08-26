import React from "react";
import PropTypes from "prop-types";

import { Header } from "./styles";
import Navbar from "../Navbar";

function Masthead({ onClickSignOut, onClickAdd }) {
  return (
    <Header>
      <Navbar onClickSignOut={onClickSignOut} onClickAdd={onClickAdd} />
    </Header>
  );
}

Masthead.propTypes = {
  onClickSignOut: PropTypes.func.isRequired,
  onClickAdd: PropTypes.func.isRequired
};

export default Masthead;
