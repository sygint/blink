import React from "react";
import { Menu, Plus as Add, LogOut, Clock, Trash2 } from "react-feather";

export default function Icon({ name, color, size, className }) {
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
