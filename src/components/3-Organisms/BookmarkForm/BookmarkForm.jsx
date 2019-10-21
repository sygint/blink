import React from "react";
import PropTypes from "prop-types";

import { Form, Label, Input, Close } from "./styles";

function BookmarkForm({ onSubmit, handleHideAddBookmarks }) {
  return (
    <Form>
      <Label htmlFor="url">Url</Label>
      <Input
        type="text"
        name="url"
        onKeyDown={event => {
          if (event.key === "Enter") {
            event.preventDefault();

            const data = new FormData(event.target.closest("form"));

            onSubmit(data);
          }
        }}
        placeholder="Add a website https://..."
      />
      <Close onClick={handleHideAddBookmarks} />
    </Form>
  );
}

BookmarkForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleHideAddBookmarks: PropTypes.func.isRequired
};

export default BookmarkForm;
