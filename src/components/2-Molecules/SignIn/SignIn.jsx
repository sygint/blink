import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { ReactComponent as Logo } from "../../../assets/images/agenda.svg";

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
`;

const StyledLogo = styled(Logo)`
  height: auto;
  width: 50%;
`;

const Title = styled.h1`
  color: $brand-color;
  margin: 0;
`;

const Button = styled.button`
  background-color: ${({ theme: { color } }) => color.button};
  border: 0.1rem solid ${({ theme: { color } }) => color.buttonBorder};
  border-radius: 0.4rem;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: fira-sans-2, sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
  padding: 5px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  white-space: nowrap;
`;

function SignIn({ onClickSignIn }) {
  return (
    <Container>
      <StyledLogo />
      <Title>Blink</Title>
      <Button type="button" onClick={onClickSignIn}>
        Sign in with Bockstack
      </Button>
    </Container>
  );
}

SignIn.propTypes = {
  onClickSignIn: PropTypes.func.isRequired
};

export default SignIn;
