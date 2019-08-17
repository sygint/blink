/* eslint-disable react/prop-types */

import React from "react";

import Bookmark from "../../03-Organisms/Bookmark";

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
