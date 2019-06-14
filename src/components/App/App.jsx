import React, { Component } from "react";
import { UserSession } from "blockstack";

import Header from "../Header";
import BookmarksList from "../BookmarksList";

const userSession = new UserSession();

// import bookmarks from "../../__mocks__/bookmarks.json

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
        this.setState({ bookmarks, isLoaded: true });
      } catch (e) {
        this.setState({ errorMsg: "Error parsing bookmarks from Blockstack" });
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

    return <main className="main">{bookmarksList}</main>;
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
