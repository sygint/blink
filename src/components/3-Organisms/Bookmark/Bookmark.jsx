import React from "react";
import PropTypes from "prop-types";

import {
  Thumbnail,
  Title,
  Extras,
  Excerpt,
  Actions,
  StyledIconButton
} from "./styles";
import Domain from "../../2-Molecules/Domain";
import ReadingTime from "../../2-Molecules/ReadingTime";

export default function Bookmark({
  onClickArchive,
  onClickUnarchive,
  onClickDelete,
  bookmark,
  isArchived
}) {
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
          {isArchived ? (
            <StyledIconButton
              icon="Unarchive"
              onClick={() => onClickUnarchive(id)}
            />
          ) : (
            <StyledIconButton
              icon="Archive"
              onClick={() => onClickArchive(id)}
            />
          )}

          <StyledIconButton icon="Trash2" onClick={() => onClickDelete(id)} />
        </Actions>
      </>
    );
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
    return null;
  }
}

Bookmark.propTypes = {
  onClickArchive: PropTypes.func.isRequired,
  onClickUnarchive: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  bookmark: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    domain: PropTypes.string.isRequired,
    wordCount: PropTypes.number.isRequired
  }).isRequired,
  isArchived: PropTypes.bool.isRequired
};
