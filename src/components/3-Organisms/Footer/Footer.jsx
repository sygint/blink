import React from "react";
import PropTypes from "prop-types";

import { StyledFooter, Attribution } from "./styles";

function Footer({ isUserSignedIn }) {
  return (
    <StyledFooter>
      <Attribution>
        <li>
          Agenda icon made by{" "}
          <a href="https://www.freepik.com/" title="Freepik">
            Freepik
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </li>
        {isUserSignedIn && (
          <li>
            Icons made by{" "}
            <a href="https://twitter.com/colebemis" title="Freepik">
              @colebemis
            </a>{" "}
            from{" "}
            <a href="https://feathericons.com/" title="Flaticon">
              Feather
            </a>
          </li>
        )}
      </Attribution>
    </StyledFooter>
  );
}

Footer.propTypes = {
  isUserSignedIn: PropTypes.bool
};

Footer.defaultProps = {
  isUserSignedIn: false
};

export default Footer;
