import React from "react";
import PropTypes from "prop-types";

import { ReactComponent as Logo } from "../../../assets/images/agenda.svg";

function SignIn({ onClickSignIn }) {
  return (
    <div className="logo-container">
      <Logo className="logo" />
      <h1 className="logo-title">Blink</h1>
      <button type="button" className="button" onClick={onClickSignIn}>
        Sign in with Bockstack
      </button>
    </div>
  );
}

SignIn.propTypes = {
  onClickSignIn: PropTypes.func.isRequired
};

export default SignIn;
