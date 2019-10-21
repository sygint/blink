import React from "react";
import PropTypes from "prop-types";

import { StyledUl, StyledLi } from "./styles";
import Bookmark from "../../3-Organisms/Bookmark";

export default function BookmarkList({
  bookmarks,
  onClickArchive,
  onClickUnarchive,
  onClickDelete,
  isArchived
}) {
  if (bookmarks && Array.isArray(bookmarks) && bookmarks.length > 0) {
    return (
      <StyledUl>
        {bookmarks.map(bookmark => {
          if (!bookmark) {
            return null;
          }

          const { id } = bookmark;

          if (!id) {
            return null;
          }

          return (
            <StyledLi key={id}>
              <Bookmark
                bookmark={bookmark}
                onClickArchive={onClickArchive}
                onClickUnarchive={onClickUnarchive}
                onClickDelete={onClickDelete}
                isArchived={isArchived}
              />
            </StyledLi>
          );
        })}
      </StyledUl>
    );
  }

  return isArchived ? "No Archived Bookmarks" : "No Bookmarks";
}

BookmarkList.propTypes = {
  bookmarks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickArchive: PropTypes.func.isRequired,
  onClickUnarchive: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  isArchived: PropTypes.bool.isRequired
};
