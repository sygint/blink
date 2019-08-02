import React from "react";

import BookmarkForm from "../BookmarkForm";

export default function AddBookmarks({ onSubmit, handleHideAddBookmarks }) {
  return (
    <BookmarkForm
      onSubmit={onSubmit}
      buttonText="Add"
      titlePlaceholder="Twitter"
      urlPlaceholder="htp://twitter.com"
      handleHideAddBookmarks={handleHideAddBookmarks}
    />
  );
}
