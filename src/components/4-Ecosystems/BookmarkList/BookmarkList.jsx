import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Bookmark from "../../3-Organisms/Bookmark";

const StyledBookmarkList = styled.ul`
  list-style: none;
  padding-left: 0;

  @media ${({ theme: { breakpoint } }) => breakpoint.mobileLandscape} {
    display: grid;
    grid-column-gap: 30px;
    grid-row-gap: 20px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
  }

  @media ${({ theme: { breakpoint } }) => breakpoint.tabletPortrait} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const BookmarkListItem = styled.li`
  border-bottom: 1px solid ${({ theme: { color } }) => color.third};
  height: 460px;
  margin: 0 auto 32px;
  padding-bottom: 16px;
  position: relative;
`;

function BookmarkList({ bookmarks, onClickDelete }) {
  return (
    <StyledBookmarkList>
      {bookmarks.map(bookmark => {
        return (
          <BookmarkListItem key={bookmark.id}>
            <Bookmark onClickDelete={onClickDelete} bookmark={bookmark} />
          </BookmarkListItem>
        );
      })}
    </StyledBookmarkList>
  );
}

BookmarkList.propTypes = {
  bookmarks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickDelete: PropTypes.func.isRequired
};

export default BookmarkList;
