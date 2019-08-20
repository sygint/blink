import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { ReactComponent as Agenda } from "../../../assets/images/agenda.svg";

const A = styled.a`
  display: flex;
  text-decoration: none;
`;

const Div = styled.div`
  display: flex;
`;

const Logo = styled(Agenda)`
  height: ${({ size }) => `${size}px`};
  margin-right: 10px;
  width: ${({ size }) => `${size}px`};
`;

const Text = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

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
