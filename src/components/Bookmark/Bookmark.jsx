import React from "react";

import { Clock } from "react-feather";

export default function Bookmark({ onDeleteBookmark, bookmark }) {
  try {
    const { title, url, id, thumbnail, excerpt, domain, wordCount } = bookmark;
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
          <span>
            <Clock size={16} /> {Math.round(wordCount / 225)} min
          </span>
        </div>
        <p className="bookmark_excerpt">{excerpt}</p>
        <button onClick={() => onDeleteBookmark(id)}>delete</button>
      </>
    );
  } catch (e) {
    console.log(e);
    return null;
  }
}
