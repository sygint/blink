import React from "react";
import PropTypes from "prop-types";
import { X as Close } from "react-feather";

import { Form, Label, Input, Button } from "./styles";

function BookmarkForm({ onSubmit, handleHideAddBookmarks }) {
  return (
    <Form>
      <Label htmlFor="url">Url</Label>
      <Input
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
      <Button type="submit" onClick={handleHideAddBookmarks}>
        <Close color="#888" />
      </Button>
    </Form>
  );
}

BookmarkForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleHideAddBookmarks: PropTypes.func.isRequired
};

export default BookmarkForm;
