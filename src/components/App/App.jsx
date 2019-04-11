import React, { Component } from "react";
import { UserSession, signUserOut } from "blockstack";

import Header from "../Header";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.userSession = new UserSession();

    this.handleSignIn = this.handleSignIn.bind(this);
  }

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

  render() {
    return (
      <Header
        isSignedIn={this.userSession.isUserSignedIn()}
        handleSignIn={this.handleSignIn}
        handleSignOut={this.handleSignOut}
      />
    );
  }
}
