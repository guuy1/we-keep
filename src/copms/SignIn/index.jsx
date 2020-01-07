import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Route, Link } from "react-router-dom";
import PasswordForgetPage from "../PasswordForget";
import * as ROUTES from "../../constants/routes";

import "./SignIn.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="SignIn">
      <h3>Sign-In</h3>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Sign-In
        </Button>
        <FormGroup>
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Link to={ROUTES.PASSWORD_FORGET}>Password Forget</Link>
        </FormGroup>
      </form>
    </div>
  );
};

export default SignIn;
