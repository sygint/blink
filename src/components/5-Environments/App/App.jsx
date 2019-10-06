import React, { Component } from "react";
import PropTypes from "prop-types";
import shortUUID from "short-uuid";

import Container from "../../4-Ecosystems/Container";
import SignIn from "../../2-Molecules/SignIn";
import Masthead from "../../4-Ecosystems/Masthead";
import Sidebar from "../../3-Organisms/Sidebar";
import Main from "../../4-Ecosystems/Main";
import Content from "../../3-Organisms/Content";
import Footer from "../../3-Organisms/Footer";
import BookmarkList from "../../4-Ecosystems/BookmarkList";
import BookmarkForm from "../../3-Organisms/BookmarkForm";

import GlobalStyles from "../../1-Atoms/GlobalStyle";

const buildCache = process.env.REACT_APP_BUILD_CACHE === "true";

export default class App extends Component {
  constructor(props) {
    super(props);

    const { bookmarkApi, userSession, offlineMode } = this.props;

    this.state = {
      bookmarkIds: [],
      bookmarks: [],
      archivedBookmarkIds: [],
      archivedBookmarks: [],
      isLoaded: false,
      isShowingAddbookmark: false,
      isSidebarVisible: false,
      isShowingArchive: false,
      errorMsg: null
    };

    this.bookmarkApi = bookmarkApi;
    this.userSession = userSession;
    this.offlineMode = offlineMode;
  }

  async componentDidMount() {
    if (!this.isUserSignedIn()) {
      return false;
    }

    const { bookmarkApi, offlineMode } = this;

    // get bookmarks.json
    try {
      const { bookmarkIds, bookmarks } = await bookmarkApi.getBookmarks();
      const {
        archivedBookmarkIds,
        archivedBookmarks
      } = await bookmarkApi.getArchivedBookmarks();

      if (offlineMode && buildCache) {
        localStorage.setItem(
          "blink/bookmarkIds.json",
          JSON.stringify(bookmarkIds)
        );

        bookmarks.forEach(bookmark => {
          localStorage.setItem(
            `blink/bookmarks/${bookmark.id}.json`,
            JSON.stringify(bookmark)
          );
        });
      }

      return this.setState({
        bookmarkIds,
        archivedBookmarkIds,
        bookmarks,
        archivedBookmarks,
        isLoaded: true
      });
    } catch (e) {
      switch (e.message) {
        case "No bookmarks":
          this.setState({
            isLoaded: true
          });
          break;

        default:
          console.trace(e);
          this.setState({
            errorMsg: "Error parsing bookmarks from Blockstack"
          });
      }
      return false;
    }
  }

  handleAddBookmark = async formData => {
    const url = formData.get("url").replace(" ", "");

    console.log("url:", url);

    if (url === "") {
      console.log("url is empty");
      return;
    }

    try {
      this.setState({ errorMsg: null });
      const res = await fetch("/.netlify/functions/extract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
      });
      const bookmark = await res.json();

      await this.addBookmark(bookmark);
      console.log("bookmark added:", bookmark);
      this.setState({ isShowingAddbookmark: false });
    } catch (e) {
      console.trace("addBookmarkError:", e);
      this.setState({ errorMsg: "Unknown error" });
    }
  };

  handleDeleteBookmark = async id => {
    const { bookmarks } = this.state;

    const deletedBookmark = bookmarks.find(
      ({ id: currentId }) => currentId === id
    );
    await this.deleteBookmark(id);
    console.log("bookmark deleted:", deletedBookmark);
  };

  handleShowAddBookmark = () => {
    this.setState({ isShowingAddbookmark: true });
  };

  handleHideAddBookmark = () => {
    this.setState({ isShowingAddbookmark: false });
  };

  handleToggleSidebar = () => {
    this.setState(prevState => ({
      isSidebarVisible: !prevState.isSidebarVisible
    }));
  };

  handleCloseSidebar = () => {
    this.setState({ isSidebarVisible: false });
  };

  handleShowAllBookmarks = () => {
    this.setState({ isShowingArchive: false });
  };

  handleShowArchive = () => {
    this.setState({ isShowingArchive: true });
  };

  handleArchiveBookmark = async id => {
    const { bookmarks } = this.state;

    const archivedBookmark = bookmarks.find(
      ({ id: currentId }) => currentId === id
    );

    await this.archiveBookmark(id);
    console.log("bookmark archived:", archivedBookmark);
  };

  handleUnarchiveBookmark = async id => {
    const { archivedBookmarks } = this.state;

    const bookmark = archivedBookmarks.find(
      ({ id: currentId }) => currentId === id
    );

    await this.unarchiveBookmark(id);
    console.log("bookmark unarchived:", bookmark);
  };

  handleSignIn = () => {
    this.userSession.redirectToSignIn();
  };

  handleSignOut = () => {
    this.userSession.signUserOut(window.location.origin);
  };

  isUserSignedIn() {
    const { userSession, offlineMode } = this;
    if (userSession.isUserSignedIn() || offlineMode) {
      return true;
    }

    if (userSession.isSignInPending()) {
      userSession
        .handlePendingSignIn()
        .then(function handlePendingSignInCallback() {
          window.location = window.location.origin;
        });
      return false;
    }

    return false;
  }

  async addBookmark(bookmarkData) {
    const { bookmarkApi } = this;
    const { bookmarkIds: prevBookmarkIds } = this.state;
    const id = shortUUID.generate();

    const {
      author,
      content,
      date_published: datePublished,
      dek,
      direction,
      domain,
      excerpt,
      lead_image_url: thumbnail,
      title,
      url,
      word_count: wordCount
    } = bookmarkData;

    const bookmark = {
      url,
      excerpt,
      title,
      thumbnail,
      wordCount,
      domain,
      id
    };

    const article = {
      author,
      content,
      datePublished,
      dek,
      direction,
      id
    };

    const bookmarkIds = [id, ...prevBookmarkIds];

    await bookmarkApi.saveBookmarkIds(bookmarkIds);
    await bookmarkApi.saveBookmark(bookmark);
    await bookmarkApi.saveArticle(article);

    this.setState(prevState => ({
      bookmarkIds,
      bookmarks: [bookmark, ...prevState.bookmarks]
    }));
  }

  async deleteBookmark(id) {
    const { bookmarkApi, userSession } = this;
    let { bookmarkIds, bookmarks } = this.state;

    bookmarkIds = bookmarkIds.filter(currentId => currentId !== id);

    bookmarks = bookmarks.filter(({ id: currentId }) => currentId !== id);

    await bookmarkApi.saveBookmarkIds(bookmarkIds);
    await userSession.deleteFile(`blink/bookmarks/${id}.json`);
    await userSession.deleteFile(`blink/articles/${id}.json`);

    console.log("deleted bookmarkIndex:", id);
    console.log("remaining bookmarks:", bookmarks);

    this.setState({ bookmarkIds, bookmarks });
  }

  async archiveBookmark(id) {
    const { bookmarkApi } = this;
    let {
      bookmarkIds,
      bookmarks,
      archivedBookmarkIds,
      archivedBookmarks
    } = this.state;
    const bookmarkToArchive = bookmarks.find(
      ({ id: currentId }) => currentId === id
    );

    bookmarkIds = bookmarkIds.filter(currentId => currentId !== id);
    bookmarks = bookmarks.filter(({ id: currentId }) => currentId !== id);

    archivedBookmarkIds = [id, ...archivedBookmarkIds];
    archivedBookmarks = [bookmarkToArchive, ...archivedBookmarks];

    await bookmarkApi.saveBookmarkIds(bookmarkIds);
    await bookmarkApi.saveArchivedBookmarkIds(archivedBookmarkIds);

    console.log("archivedBookmarkIds:", archivedBookmarkIds);
    console.log("archived bookmarkIndex:", id);
    console.log("unarchived bookmarks:", bookmarks);
    console.log("archived bookmarks:", archivedBookmarks);

    this.setState({
      bookmarkIds,
      archivedBookmarkIds,
      bookmarks,
      archivedBookmarks
    });
  }

  async unarchiveBookmark(id) {
    const { bookmarkApi } = this;
    let {
      bookmarkIds,
      archivedBookmarkIds,
      bookmarks,
      archivedBookmarks
    } = this.state;
    const bookmarkToUnarchive = archivedBookmarks.find(
      ({ id: currentId }) => currentId === id
    );

    bookmarkIds = [id, ...bookmarkIds];
    bookmarks = [bookmarkToUnarchive, ...bookmarks];

    archivedBookmarkIds = archivedBookmarkIds.filter(
      currentId => currentId !== id
    );
    archivedBookmarks = archivedBookmarks.filter(
      ({ id: currentId }) => currentId !== id
    );

    await bookmarkApi.saveBookmarkIds(bookmarkIds);
    await bookmarkApi.saveArchivedBookmarkIds(archivedBookmarkIds);

    console.log("archivedBookmarkIds:", archivedBookmarkIds);
    console.log("unarchived bookmarkIndex:", id);
    console.log("unarchived bookmarks:", bookmarks);
    console.log("archived bookmarks:", archivedBookmarks);

    this.setState({
      bookmarkIds,
      archivedBookmarkIds,
      bookmarks,
      archivedBookmarks
    });
  }

  renderBookmarkList() {
    const {
      bookmarks,
      archivedBookmarks,
      isLoaded,
      isShowingAddbookmark,
      isShowingArchive,
      isSidebarVisible,
      errorMsg
    } = this.state;

    if (!isLoaded) {
      return "loading...";
    }

    const bookmarkToShow = isShowingArchive ? archivedBookmarks : bookmarks;

    return (
      <>
        {errorMsg && errorMsg}
        <Main>
          <Content>
            <Sidebar
              isVisible={isSidebarVisible}
              onClickAllBookmarks={this.handleShowAllBookmarks}
              onClickArchive={this.handleShowArchive}
              handleCloseSidebar={this.handleCloseSidebar}
            />
            <h1>{isShowingArchive ? "Archive" : "All bookmarks"}</h1>
            {isShowingAddbookmark && (
              <BookmarkForm
                onSubmit={this.handleAddBookmark}
                handleHideAddBookmarks={this.handleHideAddBookmark}
              />
            )}
            <BookmarkList
              bookmarks={bookmarkToShow}
              onClickArchive={this.handleArchiveBookmark}
              onClickUnarchive={this.handleUnarchiveBookmark}
              onClickDelete={this.handleDeleteBookmark}
              isArchived={isShowingArchive}
            />
          </Content>
        </Main>
      </>
    );
  }

  render() {
    const { isSidebarVisible } = this.state;

    const isUserSignedIn = this.isUserSignedIn();

    return (
      <>
        <GlobalStyles />
        <Container>
          {!isUserSignedIn ? (
            <SignIn onClickSignIn={this.handleSignIn} />
          ) : (
            <>
              <Masthead
                onClickSignOut={this.handleSignOut}
                onClickAdd={this.handleShowAddBookmark}
                onClickMenu={this.handleToggleSidebar}
                isSidebarVisible={isSidebarVisible}
              />
              {this.renderBookmarkList()}
            </>
          )}
          <Footer isUserSignedIn={isUserSignedIn} />
        </Container>
      </>
    );
  }
}

App.propTypes = {
  bookmarkApi: PropTypes.shape({
    saveBookmarkIds: PropTypes.func.isRequired,
    saveArchivedBookmarkIds: PropTypes.func.isRequired,
    saveBookmark: PropTypes.func.isRequired,
    saveArticle: PropTypes.func.isRequired,
    getBookmarkIds: PropTypes.func.isRequired,
    getArchivedBookmarkIds: PropTypes.func.isRequired,
    getBookmark: PropTypes.func.isRequired,
    getArticle: PropTypes.func.isRequired,
    getBookmarks: PropTypes.func.isRequired,
    getArchivedBookmarks: PropTypes.func.isRequired
  }).isRequired,
  userSession: PropTypes.shape({
    isUserSignedIn: PropTypes.func.isRequired,
    isSignInPending: PropTypes.func.isRequired,
    handlePendingSignIn: PropTypes.func.isRequired,
    redirectToSignIn: PropTypes.func.isRequired,
    signUserOut: PropTypes.func.isRequired,
    deleteFile: PropTypes.func.isRequired
  }).isRequired,
  offlineMode: PropTypes.bool.isRequired
};
