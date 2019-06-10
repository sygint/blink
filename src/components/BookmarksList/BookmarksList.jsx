import React from "react";

export default function BookmarksList({ bookmarks }) {
  return (
    <ul>
      {bookmarks.map(({ title, url, id }) => (
        <li key={id}>
          <a href={url}>{title}</a>
        </li>
      ))}
    </ul>
  );
}
