import React from "react";
import PropTypes from "prop-types";

import { StyledMain } from "./styles";

export default function Main({ children }) {
  return <StyledMain>{children}</StyledMain>;
}

Main.propTypes = {
  children: PropTypes.node.isRequired
};
