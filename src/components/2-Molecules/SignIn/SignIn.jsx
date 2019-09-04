import React from "react";
import PropTypes from "prop-types";

import { StyledDiv, StyledLogo, Title, Button } from "./styles";

export default function SignIn({ onClickSignIn }) {
  return (
    <StyledDiv>
      <StyledLogo />
      <Title>Blink</Title>
      <Button type="button" onClick={onClickSignIn}>
        Sign in with Bockstack
      </Button>
    </StyledDiv>
  );
}

SignIn.propTypes = {
  onClickSignIn: PropTypes.func.isRequired
};
