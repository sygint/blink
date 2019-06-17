import React from "react";

export default function Header({ isSignedIn, handleSignIn, handleSignOut }) {
  return (
    <nav className="navigation">
      <div className="container">
        <a className="navigation-title" href="https://milligram.io/">
          <h1 className="title">Bookmarks</h1>
        </a>

        <ul className="navigation-list float-right">
          <li className="navigation-item">
            {!isSignedIn ? (
              <button onClick={handleSignIn}>Sign in with Bockstack</button>
            ) : (
              <button onClick={handleSignOut}>Sign out</button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

