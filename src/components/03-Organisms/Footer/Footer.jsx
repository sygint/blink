/* eslint-disable react/prop-types */

import React from "react";

export default function Footer({ isUserSignedIn }) {
  return (
    <footer className="footer">
      <ul className="attribution">
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
            Plus, X, Log-Out icons made by{" "}
            <a href="https://twitter.com/colebemis" title="Freepik">
              @colebemis
            </a>{" "}
            from{" "}
            <a href="https://feathericons.com/" title="Flaticon">
              Feather
            </a>
          </li>
        )}
      </ul>
    </footer>
  );
}
