import React, { Component } from "react";
import { UserSession, signUserOut } from "blockstack";

import Header from "../Header";
import BookmarksList from "../BookmarksList";

import bookmarks from "../../__mocks__/bookmarks.json";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.userSession = new UserSession();

    this.handleSignIn = this.handleSignIn.bind(this);
  }

  state = {
    bookmarks
  };

  componentDidMount() {
    if (this.userSession.isSignInPending()) {
      this.userSession.handlePendingSignIn().then(userData => {
        window.location = window.location.origin;
      });
    }
  }

  handleSignIn(e) {
    e.preventDefault();
    this.userSession.redirectToSignIn();
  }

  handleSignOut(e) {
    e.preventDefault();
    signUserOut(window.location.origin);
  }

  renderBookmarkList() {
    const { bookmarks } = this.state;

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
          isSignedIn={this.userSession.isUserSignedIn()}
          handleSignIn={this.handleSignIn}
          handleSignOut={this.handleSignOut}
        />

        {!this.userSession.isUserSignedIn() ? (
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
