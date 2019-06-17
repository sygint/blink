import React, { Component } from "react";
import { AppConfig, UserSession } from "blockstack";
import shortUUID from "short-uuid";

import Header from "../Header";
import BookmarksList from "../BookmarksList";
import AddBookmarks from "../AddBookmarks";

const appConfig = new AppConfig(["store_write", "publish_data"]);

const userSession = new UserSession({ appConfig });

export default class App extends Component {
  constructor(props) {
    super(props);
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  state = {
    bookmarks: [],
    isLoaded: false,
    errorMsg: null
  };

  async componentDidMount() {
    if (!this.isUserSignedIn()) {
      return false;
    }

    // get bookmarks.json
    userSession.getFile("bookmarks.json").then(data => {
      try {
        const bookmarks = JSON.parse(data);
        this.setState({
          bookmarks,
          isLoaded: true
        });
      } catch (e) {
        this.setState({
          errorMsg: "Error parsing bookmarks from Blockstack"
        });
        console.trace(e);
      }
    });
  }

  isUserSignedIn() {
    if (userSession.isUserSignedIn()) {
      return true;
    } else if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(function(userData) {
        window.location = window.location.origin;
      });
      return false;
    }
  }

  handleSignIn(e) {
    e.preventDefault();
    userSession.redirectToSignIn();
  }

  handleSignOut(e) {
    e.preventDefault();
    userSession.signUserOut(window.location.origin);
  }

  handleAddBookmark = ({ title, url }) => {
    const bookmark = {
      title,
      url,
      id: shortUUID.uuid()
    };
    const { bookmarks } = this.state;
    const newBookmarks = [...bookmarks, bookmark];

    userSession
      .putFile("bookmarks.json", JSON.stringify(newBookmarks))
      .then(result => {
        this.setState({
          bookmarks: newBookmarks
        });
      });
  };

  renderBookmarkList() {
    const { bookmarks, isLoaded, errorMsg } = this.state;

    if (errorMsg) {
      return errorMsg;
    }

    if (!isLoaded) {
      return "loading...";
    }

    const bookmarksList =
      !!bookmarks && Array.isArray(bookmarks) && bookmarks.length > 0 ? (
        <BookmarksList bookmarks={bookmarks} />
      ) : (
        "no bookmarks"
      );

    return (
      <main className="main">
        <AddBookmarks onSubmit={this.handleAddBookmark} />
        {bookmarksList}
      </main>
    );
  }

  render() {
    return (
      <>
        <Header
          isSignedIn={this.isUserSignedIn()}
          handleSignIn={this.handleSignIn}
          handleSignOut={this.handleSignOut}
        />

        {!this.isUserSignedIn() ? (
          <h1 style={{ textAlign: "center" }}>
            Please Sign in with Blockstack
          </h1>
        ) : (
          this.renderBookmarkList()
        )}
      </>
    );
  }
}
