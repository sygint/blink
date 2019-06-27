import React from "react";

export default function BookmarksList({ bookmarks, onDeleteBookmark }) {
  return (
    <ul>
      {bookmarks.map(({ title, url, id }) => (
        <li key={id}>
          <>
            <a href={url}>{title}</a>{" "}
            <button onClick={() => onDeleteBookmark(id)}>delete</button>
          </>
        </li>
      ))}
    </ul>
  );
}
