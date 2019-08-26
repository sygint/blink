import React from "react";
import PropTypes from "prop-types";

import { Thumbnail, Title, Extras, Excerpt, Actions, Delete } from "./styles";
import Domain from "../../2-Molecules/Domain";
import ReadingTime from "../../2-Molecules/ReadingTime";

function Bookmark({ onClickDelete, bookmark }) {
  try {
    const { title, url, id, thumbnail, excerpt, domain, wordCount } = bookmark;

    return (
      <>
        <Thumbnail href={url} image={thumbnail}>
          {title}
        </Thumbnail>
        <Title href={url}>{title}</Title>
        <Extras>
          <Domain url={url} domain={domain} />
          <ReadingTime wordCount={wordCount} />
        </Extras>
        <Excerpt>{excerpt}</Excerpt>
        <Actions>
          <Delete name="Trash2" onClick={() => onClickDelete(id)} />
        </Actions>
      </>
    );
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
    return null;
  }
}

Bookmark.propTypes = {
  onClickDelete: PropTypes.func.isRequired,
  bookmark: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    domain: PropTypes.string.isRequired,
    wordCount: PropTypes.number.isRequired
  }).isRequired
};

export default Bookmark;
