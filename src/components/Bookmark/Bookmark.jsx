import React from "react";

export default function Bookmark({ onDeleteBookmark, bookmark }) {
  const { title, url, id, thumbnail, excerpt, domain } = bookmark;
  const scheme = url.substr(0, url.indexOf("://") + 3);

  return (
    <>
      <a href={url} className="bookmark_title">
        <div
          className="bookmark_thumbnail"
          style={{ backgroundImage: `url(${thumbnail}` }}
        />
        {title}
      </a>
      <div className="bookmark_extras">
        <a href={scheme + domain} className="bookmark_domain">
          {domain}
        </a>
      </div>
      <p className="bookmark_excerpt">{excerpt}</p>
      <button onClick={() => onDeleteBookmark(id)}>delete</button>
    </>
  );
}
