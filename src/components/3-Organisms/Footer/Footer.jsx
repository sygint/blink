import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.footer`
  font-size: 10px;
  text-align: center;
`;

const Attribution = styled.ul`
  list-style: none;
  padding-left: 0;
`;

function Footer({ isUserSignedIn }) {
  return (
    <Container>
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
    </Container>
  );
}

Footer.propTypes = {
  isUserSignedIn: PropTypes.bool
};

Footer.defaultProps = {
  isUserSignedIn: false
};

export default Footer;
