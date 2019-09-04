import React from "react";
import PropTypes from "prop-types";

import { StyledDiv } from "./styles";

export default function Container({ children }) {
  return <StyledDiv>{children}</StyledDiv>;
}

Container.propTypes = {
  children: PropTypes.node.isRequired
};
