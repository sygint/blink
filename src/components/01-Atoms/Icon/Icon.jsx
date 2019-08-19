import React from "react";
import { Menu, Plus as Add, LogOut } from "react-feather";

export default function Icon({ name, color, size, className }) {
  const Icons = {
    Menu,
    Add,
    LogOut
  };

  const IconComponent = Icons[name];

  return <IconComponent color={color} size={size} className={className} />;
}
