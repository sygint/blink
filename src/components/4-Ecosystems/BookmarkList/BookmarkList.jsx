import React from "react";
import PropTypes from "prop-types";

import Bookmark from "../../3-Organisms/Bookmark";

function BookmarkList({ bookmarks, onDeleteBookmark }) {
  return (
    <ul className="bookmark-list">
      {bookmarks.map(bookmark => {
        return (
          <li key={bookmark.id} className="bookmark-list_item">
            <Bookmark onDeleteBookmark={onDeleteBookmark} bookmark={bookmark} />
          </li>
        );
      })}
    </ul>
  );
}

BookmarkList.propTypes = {
  bookmarks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteBookmark: PropTypes.func.isRequired
};

export default BookmarkList;
