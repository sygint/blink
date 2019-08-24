import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Icon from "../../1-Atoms/Icon";
import Domain from "../../2-Molecules/Domain";
import ReadingTime from "../../2-Molecules/ReadingTime";

const Thumbnail = styled.a`
  background: ${({ image }) => `url(${image})`};
  background-position: center center;
  background-size: cover;
  border-radius: 4px;
  display: block;
  height: 250px;
  margin-bottom: 16px;
  text-indent: -999999px;
  width: 100%;
`;

const Title = styled.a`
  -webkit-box-orient: vertical; /* stylelint-disable-line property-no-vendor-prefix */
  color: #000;
  display: -webkit-box; /* stylelint-disable-line value-no-vendor-prefix */
  font-weight: 600;
  -webkit-line-clamp: 3;
  max-height: 4.4em;
  overflow: hidden;
  text-align: justify;
  text-decoration: none;
`;

const Extras = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
`;

const Excerpt = styled.p`
  margin-top: 0;
  max-height: 3em;
  overflow: hidden;
  text-align: justify;
`;

const Actions = styled.div`
  bottom: 10px;
  position: absolute;
  right: 0;
`;

const Delete = styled(Icon)`
  cursor: pointer;
`;

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
