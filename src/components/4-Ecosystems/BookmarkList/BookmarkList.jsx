import React from "react";
import PropTypes from "prop-types";

import { StyledUl, StyledLi } from "./styles";
import Bookmark from "../../3-Organisms/Bookmark";

function BookmarkList({ bookmarks, onClickArchive, onClickDelete }) {
  return (
    <StyledUl>
      {bookmarks.map(bookmark => {
        return (
          <StyledLi key={bookmark.id}>
            <Bookmark
              bookmark={bookmark}
              onClickArchive={onClickArchive}
              onClickDelete={onClickDelete}
            />
          </StyledLi>
        );
      })}
    </StyledUl>
  );
}

BookmarkList.propTypes = {
  bookmarks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickArchive: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired
};

export default BookmarkList;
