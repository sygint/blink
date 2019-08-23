import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledDiv = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  position: relative;
`;

function Container({ children }) {
  return <StyledDiv>{children}</StyledDiv>;
}

Container.propTypes = {
  children: PropTypes.node.isRequired
};

export default Container;
