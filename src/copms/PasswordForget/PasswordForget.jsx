import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

const PasswordForget = () => {
  const [email, setEmail] = useState("");

  function validateForm() {
    return email.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="PasswordForget">
      <h3>Password Forget</h3>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="small">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Forget Password
        </Button>
      </form>
    </div>
  );
};

export default PasswordForget;
