import React from "react";
import PropTypes from "prop-types";

import { Overlay, StyledSidebar, Group, StyledIcon } from "./styles";

function Sidebar({ isVisible, onClickAllBookmarks, onClickArchive }) {
  return (
    <>
      <StyledSidebar isVisible={isVisible}>
        <Group>
          <button type="button" onClick={onClickAllBookmarks}>
            <StyledIcon name="Bookmark" /> All Bookmarks
          </button>
          <button type="button" onClick={onClickArchive}>
            <StyledIcon name="Archive" /> Archive
          </button>
        </Group>
      </StyledSidebar>
      <Overlay isVisible={isVisible} />
    </>
  );
}

Sidebar.propTypes = {
  isVisible: PropTypes.bool,
  onClickAllBookmarks: PropTypes.func.isRequired,
  onClickArchive: PropTypes.func.isRequired
};

Sidebar.defaultProps = {
  isVisible: false
};

export default Sidebar;
