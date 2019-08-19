import React from "react";
import PropTypes from "prop-types";

import { X as Close } from "react-feather";

function BookmarkForm({ onSubmit, handleHideAddBookmarks }) {
  return (
    <form className="form bookmark-form">
      <label htmlFor="url" className="bookmark-form_label">
        Url
      </label>
      <input
        type="text"
        name="url"
        className="bookmark-form_field"
        onKeyDown={event => {
          const data = new FormData(event.target.closest("form"));

          if (event.key !== "Enter") {
            return false;
          }

          return onSubmit(data);
        }}
        placeholder="Add a website https://..."
      />
      <button
        type="submit"
        className="bookmark-form_button"
        onClick={handleHideAddBookmarks}
      >
        <Close color="#888" />
      </button>
    </form>
  );
}

BookmarkForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleHideAddBookmarks: PropTypes.func.isRequired
};

export default BookmarkForm;
