import React from "react";
import PropTypes from "prop-types";

import Branding from "../../2-Molecules/Branding";
import IconButton from "../../2-Molecules/IconButton";

function MainNavbar({ handleSignOut, handleShowAddBookmark }) {
  return (
    <nav className="navbar -main">
      <div className="navbar_menu">
        <IconButton icon="Menu" />
      </div>

      <Branding linkTo="/" />

      <div className="navbar_actions">
        <IconButton icon="Add" onClick={handleShowAddBookmark} />
        <IconButton icon="LogOut" onClick={handleSignOut} />
      </div>
    </nav>
  );
}

MainNavbar.propTypes = {
  handleSignOut: PropTypes.func.isRequired,
  handleShowAddBookmark: PropTypes.func.isRequired
};

export default MainNavbar;
