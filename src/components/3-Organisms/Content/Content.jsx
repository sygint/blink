import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Section = styled.section`
  margin-top: 65px;
  padding: 30px;
`;

function Content({ children }) {
  return <Section>{children}</Section>;
}

Content.propTypes = {
  children: PropTypes.node.isRequired
};

export default Content;
