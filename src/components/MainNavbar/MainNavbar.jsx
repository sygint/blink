import React from "react";

import IconButton from "../02-Molecules/IconButton";
import { ReactComponent as Logo } from "../../assets/images/agenda.svg";

export default function MainNavbar({ handleSignOut, handleShowAddBookmark }) {
  return (
    <nav className="navbar -main">
      <div className="navbar_menu">
        <IconButton icon="Menu" />
      </div>

      <a className="navbar_branding" href="/">
        <Logo className="branding_logo" />
        <div className="branding_text">Blink</div>
      </a>

      <div className="navbar_actions">
        <IconButton icon="Add" onClick={handleShowAddBookmark} />
        <IconButton icon="LogOut" onClick={handleSignOut} />
      </div>
    </nav>
  );
}
