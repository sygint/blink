import React from "react";

import Icon from "../01-Atoms/Icon";
import { ReactComponent as Logo } from "../../assets/images/agenda.svg";

export default function MainNavbar({ handleSignOut, handleShowAddBookmark }) {
  return (
    <nav className="navbar -main">
      <div className="navbar_menu">
        <button className="navbar_button">
          {/* onClick={handleToggleSideNav} */}
          <Icon name="Menu" color="#888" size="24" />
        </button>
      </div>

      <a className="navbar_branding" href="/">
        <Logo className="branding_logo" />
        <div className="branding_text">Blink</div>
      </a>

      <div className="navbar_actions">
        <button className="navbar_button" onClick={handleShowAddBookmark}>
          <Icon name="LogOut" color="#888" size="24" />
        </button>
        <button className="navbar_button" onClick={handleSignOut}>
          <Icon name="LogOut" color="#888" size="24" />
        </button>
      </div>
    </nav>
  );
}
