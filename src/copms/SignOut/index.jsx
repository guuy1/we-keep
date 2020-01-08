import React from "react";
import { withFirebase } from "../Firebase";
import "bootstrap/dist/css/bootstrap.css";

const SignOutButton = ({ firebase }) => (
  <button
    className="btn btn-danger m-1"
    type="button"
    onClick={firebase.doSignOut}
  >
    יציאה
  </button>
);
export default withFirebase(SignOutButton);
