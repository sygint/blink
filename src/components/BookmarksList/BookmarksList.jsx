import React from "react";

import Bookmark from "../Bookmark";

export default function BookmarksList({ bookmarks, onDeleteBookmark }) {
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
