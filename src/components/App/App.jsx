import React, { Component } from "react";
import { AppConfig, UserSession } from "blockstack";
import uuid from "uuid/v4";
import axios from "axios";

import Header from "../Header";
import BookmarksList from "../BookmarksList";
import AddBookmarks from "../AddBookmarks";

import "../../assets/styles/index.scss";
import { ReactComponent as Logo } from "../../assets/images/agenda.svg";

const appConfig = new AppConfig(["store_write", "publish_data"]);

const userSession = new UserSession({ appConfig });

export default class App extends Component {
  constructor(props) {
    super(props);

    const isUserSignedIn = this.isUserSignedIn();

    this.state.isUserSignedIn = isUserSignedIn;
  }

  state = {
    isUserSignedIn: false,
    bookmarkIndexes: [],
    bookmarks: [],
    isLoaded: false,
    isShowingAddbookmark: false,
    errorMsg: null
  };

  async componentDidMount() {
    if (!this.isUserSignedIn()) {
      return false;
    }

    // get bookmarks.json
    try {
      const { bookmarkIndexes, bookmarks } = await this.getBookmarks();

      this.setState({
        bookmarkIndexes,
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
          console.log(e.message);
          console.trace(e);
          this.setState({
            errorMsg: "Error parsing bookmarks from Blockstack"
          });
      }
    }
  }

  isUserSignedIn() {
    if (userSession.isUserSignedIn()) {
      return true;
    } else if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(function() {
        window.location = window.location.origin;
      });
      return false;
    }
  }

  async getBookmarks() {
    const bookmarkIndexesJson = await userSession.getFile(
      "blink/bookmarks.json"
    );

    if (!bookmarkIndexesJson) {
      throw Error("No bookmarks");
    }

    const bookmarkIndexes = JSON.parse(bookmarkIndexesJson);
    console.log("retrieved bookmark indexes:", bookmarkIndexes);

    if (bookmarkIndexes.length === 0) {
      throw Error("No bookmarks");
    }

    const bookmarkPromises = bookmarkIndexes.map(bookmarkIndex =>
      userSession.getFile(`blink/bookmarks/${bookmarkIndex}.json`)
    );
    console.log("retrieved bookmark promises:", bookmarkPromises);

    const bookmarksJson = await Promise.all(bookmarkPromises);
    const bookmarks = JSON.parse(bookmarksJson);
    console.log("retrieved bookmarks:", bookmarks);

    return { bookmarkIndexes, bookmarks };
  }

  async saveBookmarkIndexes(indexes) {
    await userSession.putFile("blink/bookmarks.json", JSON.stringify(indexes));
  }

  async addBookmark(bookmarkData) {
    const id = uuid().replace(/-/g, "");

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
      id
    };

    const article = {
      author,
      content,
      date_published,
      dek,
      direction,
      domain,
      id
    };

    const bookmarkIndexes = [id, ...this.state.bookmarkIndexes];
    const bookmarks = [bookmark, ...this.state.bookmarks];

    await this.saveBookmarkIndexes(bookmarkIndexes);
    await userSession.putFile(
      `blink/bookmarks/${bookmark.id}.json`,
      JSON.stringify(bookmarks)
    );
    await userSession.putFile(
      `blink/articles/${bookmark.id}.json`,
      JSON.stringify(article)
    );

    this.setState({ bookmarkIndexes, bookmarks });
  }

  async deleteBookmark(id) {
    const bookmarkIndexes = this.state.bookmarkIndexes.filter(
      currentId => currentId !== id
    );

    const bookmarks = this.state.bookmarks.filter(
      ({ id: currentId }) => currentId !== id
    );

    await this.saveBookmarkIndexes(bookmarkIndexes);
    await userSession.deleteFile(`blink/bookmarks/${id}.json`);
    await userSession.deleteFile(`blink/articles/${id}.json`);

    this.setState({ bookmarkIndexes, bookmarks });
  }

  handleSignIn() {
    userSession.redirectToSignIn();
  }

  handleSignOut() {
    userSession.signUserOut(window.location.origin);
  }

  handleAddBookmark = async ({ url }) => {
    try {
      const res = await axios.post("/extract", {
        url
      });
      const bookmark = res.data;

      this.addBookmark(bookmark);
      console.log("bookmark added:", bookmark);
    } catch (e) {
      console.trace("addBookmarkError:", e);
    }
  };

  handleDeleteBookmark = async id => {
    const deletedBookmark = this.state.bookmarks.find(
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

  renderBookmarkList() {
    const { bookmarks, isLoaded, isShowingAddbookmark, errorMsg } = this.state;

    if (errorMsg) {
      return errorMsg;
    }

    if (!isLoaded) {
      return "loading...";
    }

    const bookmarksList =
      bookmarks && Array.isArray(bookmarks) && bookmarks.length > 0 ? (
        <BookmarksList
          bookmarks={bookmarks}
          onDeleteBookmark={this.handleDeleteBookmark}
        />
      ) : (
        "no bookmarks"
      );

    return (
      <main className="main">
        {isShowingAddbookmark && (
          <AddBookmarks
            onSubmit={this.handleAddBookmark}
            handleHideAddBookmarks={this.handleHideAddBookmark}
          />
        )}
        {bookmarksList}
      </main>
    );
  }

  render() {
    const isUserSignedIn = this.isUserSignedIn();

    if (!isUserSignedIn) {
      return (
        <>
          <div className="container full">
            <div className="logo-container">
              <Logo className="logo" />
              <h1 className="logo-title">Blink</h1>
            </div>
            <button className="button" onClick={this.handleSignIn}>
              Sign in with Bockstack
            </button>
          </div>
        </>
      );
    }

    return (
      <>
        <div className="container">
          <Header
            isSignedIn={isUserSignedIn}
            handleSignIn={this.handleSignIn}
            handleSignOut={this.handleSignOut}
            handleShowAddBookmark={this.handleShowAddBookmark}
          />
          {this.renderBookmarkList()}
        </div>
        {/* <div>
          Icons made by{" "}
          <a href="https://www.freepik.com/" title="Freepik">
            Freepik
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>{" "}
          is licensed by{" "}
          <a
            href="http://creativecommons.org/licenses/by/3.0/"
            title="Creative Commons BY 3.0"
            target="_blank"
          >
            CC 3.0 BY
          </a>
        </div>{" "} */}
      </>
    );
  }
}
