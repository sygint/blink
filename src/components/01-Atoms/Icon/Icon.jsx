import React from "react";
import PropTypes from "prop-types";
import { Menu, Plus as Add, LogOut, Clock, Trash2 } from "react-feather";

function Icon({ name, color, size, className }) {
  const Icons = {
    Menu,
    Add,
    LogOut,
    Clock,
    Trash2
  };

  const IconComponent = Icons[name];

  return <IconComponent color={color} size={size} className={className} />;
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string
};

Icon.defaultProps = {
  color: "#888",
  size: undefined,
  className: undefined
};

export default Icon;
