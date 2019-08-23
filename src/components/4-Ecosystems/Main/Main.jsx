import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledMain = styled.main`
  flex-grow: 1;
`;

function Main({ children }) {
  return <StyledMain>{children}</StyledMain>;
}

Main.propTypes = {
  children: PropTypes.node.isRequired
};

export default Main;
