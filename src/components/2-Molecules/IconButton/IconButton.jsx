import React from "react";
import PropTypes from "prop-types";

import { Button } from "./styles";
import Icon from "../../1-Atoms/Icon";

export default function IconButton({ icon, onClick }) {
  return (
    <Button onClick={onClick} type="button">
      <Icon name={icon} />
    </Button>
  );
}

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
