import React from "react";

import { ReactComponent as Logo } from "../../assets/images/agenda.svg";

export default function Header({ isSignedIn, handleSignIn, handleSignOut }) {
  return (
    <nav className="navigation">
      <a className="navigation-title-link" href="/">
        <Logo className="logo header" />
      </a>

      <ul className="navigation-list">
        <li className="navigation-item">
          {!isSignedIn ? (
            <button className="button header" onClick={handleSignIn}>
              Sign in with Bockstack
            </button>
          ) : (
            <button className="button header" onClick={handleSignOut}>
              Sign out
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}
