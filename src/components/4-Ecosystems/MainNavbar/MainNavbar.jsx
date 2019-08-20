import React from "react";
import PropTypes from "prop-types";

import Branding from "../../2-Molecules/Branding";
import IconButton from "../../2-Molecules/IconButton";

function MainNavbar({ onClickSignOut, onClickAdd }) {
  return (
    <nav className="navbar -main">
      <div className="navbar_menu">
        <IconButton icon="Menu" />
      </div>

      <Branding linkTo="/" />

      <div className="navbar_actions">
        <IconButton icon="Add" onClick={onClickAdd} />
        <IconButton icon="LogOut" onClick={onClickSignOut} />
      </div>
    </nav>
  );
}

MainNavbar.propTypes = {
  onClickSignOut: PropTypes.func.isRequired,
  onClickAdd: PropTypes.func.isRequired
};

export default MainNavbar;
