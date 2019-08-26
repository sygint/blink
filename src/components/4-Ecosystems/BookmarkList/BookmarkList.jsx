import React from "react";
import PropTypes from "prop-types";

import { StyledUl, StyledLi } from "./styles";
import Bookmark from "../../3-Organisms/Bookmark";

function BookmarkList({ bookmarks, onClickDelete }) {
  return (
    <StyledUl>
      {bookmarks.map(bookmark => {
        return (
          <StyledLi key={bookmark.id}>
            <Bookmark onClickDelete={onClickDelete} bookmark={bookmark} />
          </StyledLi>
        );
      })}
    </StyledUl>
  );
}

BookmarkList.propTypes = {
  bookmarks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickDelete: PropTypes.func.isRequired
};

export default BookmarkList;
