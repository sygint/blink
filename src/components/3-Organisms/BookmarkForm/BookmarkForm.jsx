import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { X as Close } from "react-feather";

const StyledForm = styled.form`
  background: #eee;
  border-radius: 4px;
  box-sizing: border-box;
  display: flex;
  height: $head-height - $spacing * 2;
  left: 20px;
  padding: 5px 5px 5px 15px;
  position: absolute;
  right: 59px;
  top: 10px;
  z-index: 510;
`;

const StyledLabel = styled.label`
  display: none;
  font-size: 1rem;
  font-weight: 600;
  line-height: normal;
  margin-right: 10px;

  ::after {
    content: ":";
  }
`;

const StyledInput = styled.input`
  background: none;
  border: 0;
  box-sizing: border-box;
  color: darken($header-icon-color, 25);
  flex-grow: 1;
  font-size: 18px;
  height: 100%;

  ::placeholder {
    color: lighten($header-icon-color, 15);
  }
`;

const StyledButton = styled.button`
  background: transparent;
  border: 0;
  padding: 0;
`;

function BookmarkForm({ onSubmit, handleHideAddBookmarks }) {
  return (
    <StyledForm>
      <StyledLabel htmlFor="url">Url</StyledLabel>
      <StyledInput
        type="text"
        name="url"
        onKeyDown={event => {
          const data = new FormData(event.target.closest("form"));

          if (event.key !== "Enter") {
            return false;
          }

          return onSubmit(data);
        }}
        placeholder="Add a website https://..."
      />
      <StyledButton type="submit" onClick={handleHideAddBookmarks}>
        <Close color="#888" />
      </StyledButton>
    </StyledForm>
  );
}

BookmarkForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleHideAddBookmarks: PropTypes.func.isRequired
};

export default BookmarkForm;
