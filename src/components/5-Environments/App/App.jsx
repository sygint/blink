import React, { Component } from "react";
import { AppConfig, UserSession } from "blockstack";
import shortUUID from "short-uuid";
import axios from "axios";

import bookmarksHelper from "./bookmarkHelpers";
import mockBookmarksHelper from "../../../__mocks__/bookmarkHelpers";
import SignIn from "../../2-Molecules/SignIn";
import Masthead from "../../4-Ecosystems/Masthead";
import Main from "../../4-Ecosystems/Main";
import Content from "../../3-Organisms/Content";
import Footer from "../../3-Organisms/Footer";
import BookmarkList from "../../4-Ecosystems/BookmarkList";
import BookmarkForm from "../../3-Organisms/BookmarkForm";

import "../../../assets/styles/index.scss";

const appConfig = new AppConfig(["store_write", "publish_data"]);
const userSession = new UserSession({ appConfig });

let bookmarkApi;

if (process.env.REACT_APP_OFFLINE) {
  console.log("*** using offline mode ***");
  bookmarkApi = mockBookmarksHelper();
} else {
  bookmarkApi = bookmarksHelper(userSession);
}

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookmarkIds: [],
      bookmarks: [],
      isLoaded: false,
      isShowingAddbookmark: false,
      errorMsg: null
    };
  }

  async componentDidMount() {
    if (!this.isUserSignedIn()) {
      return false;
    }

    // get bookmarks.json
    try {
      const { bookmarkIds, bookmarks } = await bookmarkApi.getBookmarks();

      if (process.env.REACT_APP_OFFLINE && process.env.REACT_APP_BUILD_CACHE) {
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
        bookmarks,
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
      const res = await axios.post("/extract", {
        url
      });
      const bookmark = res.data;

      await this.addBookmark(bookmark);
      console.log("bookmark added:", bookmark);
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

  isUserSignedIn() {
    if (userSession.isUserSignedIn() || process.env.REACT_APP_OFFLINE) {
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

  handleSignIn() {
    userSession.redirectToSignIn();
  }

  handleSignOut() {
    userSession.signUserOut(window.location.origin);
  }

  async addBookmark(bookmarkData) {
    const { bookmarkIds: prevBookmarkIds } = this.state;
    const id = shortUUID.generate();

    const {
      author,
      content,
      date_published,
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
      date_published,
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

  renderBookmarkList() {
    const { bookmarks, isLoaded, isShowingAddbookmark, errorMsg } = this.state;

    if (!isLoaded) {
      return "loading...";
    }

    const bookmarkList =
      bookmarks && Array.isArray(bookmarks) && bookmarks.length > 0 ? (
        <BookmarkList
          bookmarks={bookmarks}
          onDeleteBookmark={this.handleDeleteBookmark}
        />
      ) : (
        "no bookmarks"
      );

    return (
      <>
        {errorMsg && errorMsg}
        <Main>
          <Content>
            <h1>All bookmarks</h1>
            {isShowingAddbookmark && (
              <BookmarkForm
                onSubmit={this.handleAddBookmark}
                handleHideAddBookmarks={this.handleHideAddBookmark}
              />
            )}
            {bookmarkList}
          </Content>
        </Main>
      </>
    );
  }

  render() {
    const isUserSignedIn = this.isUserSignedIn();

    return (
      <>
        <div className="container full">
          {!isUserSignedIn ? (
            <SignIn onClickSignIn={this.handleSignIn} />
          ) : (
            <>
              <Masthead
                isSignedIn={isUserSignedIn}
                handleSignIn={this.handleSignIn}
                handleSignOut={this.handleSignOut}
                handleShowAddBookmark={this.handleShowAddBookmark}
              />
              {this.renderBookmarkList()}
            </>
          )}
          <Footer isUserSignedIn={isUserSignedIn} />
        </div>
      </>
    );
  }
}
