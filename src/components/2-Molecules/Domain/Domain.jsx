import React from "react";
import PropTypes from "prop-types";

import { A } from "./styles";

export default function Domain({ url, domain }) {
  const scheme = url.substr(0, url.indexOf("://") + 3);

  return <A href={scheme + domain}>{domain}</A>;
}

Domain.propTypes = {
  url: PropTypes.string.isRequired,
  domain: PropTypes.string.isRequired
};
