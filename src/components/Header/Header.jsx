import React from "react";

import { Plus as Add, LogOut } from "react-feather";
import { ReactComponent as Logo } from "../../assets/images/agenda.svg";

export default function Header({ handleSignOut, handleShowAddBookmark }) {
  return (
    <nav className="navigation">
      <a className="navigation-title-link" href="/">
        <Logo className="logo header-icon" />
        <h1 className="logo-title">Blink</h1>
      </a>

      <ul className="navigation-list">
        <li className="navigation-item">
          <Add color="#888" onClick={handleShowAddBookmark} />
        </li>
        <li className="navigation-item">
          <LogOut color="#888" onClick={handleSignOut} />
        </li>
      </ul>
    </nav>
  );
}
