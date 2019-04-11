import React, { Component } from "react";
import { UserSession, signUserOut } from "blockstack";
import { Container, Image, Menu } from "semantic-ui-react";

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
    const { userSession } = this;

    return (
      <Menu borderless>
        <Container text>
          <Menu.Item>
            <Image size="mini" src="/logo.png" />
          </Menu.Item>

          <Menu.Item header>Bookmarks</Menu.Item>

          <Menu.Menu position="right">
            {!userSession.isUserSignedIn() ? (
              <Menu.Item as="button" onClick={this.handleSignIn}>
                Sign In with Blockstack
              </Menu.Item>
            ) : (
              <Menu.Item as="button" onClick={this.handleSignOut}>
                Sign out
              </Menu.Item>
            )}
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}
