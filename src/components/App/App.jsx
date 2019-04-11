import React, { Component } from "react";
import { UserSession, signUserOut } from "blockstack";

import Profile from "../Profile";
import Signin from "../Signin";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.userSession = new UserSession();

    this.handleSignIn = this.handleSignIn.bind(this);
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
    const { userSession } = this;

    return (
      <div className="site-wrapper">
        <div className="site-wrapper-inner">
          {!userSession.isUserSignedIn() ? (
            <Signin handleSignIn={this.handleSignIn} />
          ) : (
            <Profile
              handleSignOut={this.handleSignOut}
              userSession={userSession}
            />
          )}
        </div>
      </div>
    );
  }

  componentWillMount() {
    if (this.userSession.isSignInPending()) {
      this.userSession.handlePendingSignIn().then(userData => {
        window.location = window.location.origin;
      });
    }
  }
}
