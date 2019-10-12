import React from "react";
import PropTypes from "prop-types";

import { LogoSection, StyledDiv, StyledLogo, Title, Button } from "./styles";

export default function SignIn({ onClickSignIn }) {
  return (
    <>
      <StyledDiv>
        <LogoSection>
          <StyledLogo />
          <Title>Blink</Title>
        </LogoSection>
        <Button type="button" onClick={onClickSignIn}>
          Sign in with Bockstack
        </Button>
      </StyledDiv>
    </>
  );
}

SignIn.propTypes = {
  onClickSignIn: PropTypes.func.isRequired
};
