import React from "react";
import PropTypes from "prop-types";

import { A, Div, Logo, Text } from "./styles";

function Branding({ linkTo, size = 32 }) {
  let StyledBranding;

  if (linkTo) {
    StyledBranding = A;
  } else {
    StyledBranding = Div;
  }

  return (
    <StyledBranding href={linkTo}>
      <Logo size={size} />
      <Text>Blink</Text>
    </StyledBranding>
  );
}

Branding.propTypes = {
  linkTo: PropTypes.string,
  size: PropTypes.number
};

Branding.defaultProps = {
  linkTo: undefined,
  size: 32
};

export default Branding;
