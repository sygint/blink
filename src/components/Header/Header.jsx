import React from "react";
import { Container, Menu } from "semantic-ui-react";

function Header({ isSignedIn, handleSignIn, handleSignOut }) {
  return (
    <Menu borderless>
      <Container text>
        {/* <Menu.Item>
            <Image size="mini" src="/logo.png" />
          </Menu.Item> */}

        <Menu.Item header>Bookmarks</Menu.Item>

        <Menu.Menu position="right">
          {!isSignedIn ? (
            <Menu.Item as="button" onClick={handleSignIn}>
              Sign In with Blockstack
            </Menu.Item>
          ) : (
            <Menu.Item as="button" onClick={handleSignOut}>
              Sign out
            </Menu.Item>
          )}
        </Menu.Menu>
      </Container>
    </Menu>
  );
}

export default Header;
