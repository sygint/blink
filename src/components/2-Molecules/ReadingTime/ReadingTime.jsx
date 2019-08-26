import React from "react";
import PropTypes from "prop-types";

import { Span, StyledIcon } from "./styles";

function ReadingTime({ wordCount }) {
  return (
    <Span>
      <StyledIcon name="Clock" size={16} />
      {Math.round(wordCount / 225)} min
    </Span>
  );
}

ReadingTime.propTypes = {
  wordCount: PropTypes.number.isRequired
};

export default ReadingTime;
