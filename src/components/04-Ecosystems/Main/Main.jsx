import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.main`
  flex-grow: 1;
`;

function Main({ children }) {
  return <Container>{children}</Container>;
}

Main.propTypes = {
  children: PropTypes.node.isRequired
};

export default Main;
