import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledA = styled.a`
  color: #000;
  font-weight: 100;
  text-decoration: none;
`;

function Domain({ url, domain }) {
  const scheme = url.substr(0, url.indexOf("://") + 3);

  return <StyledA href={scheme + domain}>{domain}</StyledA>;
}

Domain.propTypes = {
  url: PropTypes.string.isRequired,
  domain: PropTypes.string.isRequired
};

export default Domain;
