import React from "react";
import PropTypes from "prop-types";
import {
  Menu,
  ChevronLeft as CloseSidebar,
  Plus as Add,
  LogOut,
  Clock,
  Trash2,
  Bookmark,
  Archive,
  PlusSquare as Unarchive
} from "react-feather";

import theme from "../../../theme";

function Icon({ name, color, size, className }) {
  const Icons = {
    Menu,
    CloseSidebar,
    Add,
    LogOut,
    Clock,
    Trash2,
    Bookmark,
    Archive,
    Unarchive
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
  color: theme.color.icon,
  size: undefined,
  className: undefined
};

export default Icon;
