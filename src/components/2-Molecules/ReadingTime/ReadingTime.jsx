import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Icon from "../../1-Atoms/Icon";

const StyledReadingTime = styled.span`
  align-items: center;
  display: flex;
`;

const StyledIcon = styled(Icon)`
  margin-right: 5px;
`;

function ReadingTime({ wordCount }) {
  return (
    <StyledReadingTime>
      <StyledIcon name="Clock" size={16} />
      {Math.round(wordCount / 225)} min
    </StyledReadingTime>
  );
}

ReadingTime.propTypes = {
  wordCount: PropTypes.number.isRequired
};

export default ReadingTime;
