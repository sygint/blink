import React from "react";

import { X as Close } from "react-feather";

export default function BookmarkForm({ onSubmit, handleHideAddBookmarks }) {
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

          if (event.key === "Enter") {
            onSubmit(data);
          }
        }}
        placeHolder="Add a website https://..."
      />
      <button
        type="submit"
        className="bookmark-form_button"
        onClick={handleHideAddBookmarks}
      >
        <Close color={"#888"} />
      </button>
    </form>
  );
}
