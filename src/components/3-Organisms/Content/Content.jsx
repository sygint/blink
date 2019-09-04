import React from "react";
import PropTypes from "prop-types";

import { Section } from "./styles";

export default function Content({ children }) {
  return <Section>{children}</Section>;
}

Content.propTypes = {
  children: PropTypes.node.isRequired
};
