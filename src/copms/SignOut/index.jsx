import React from "react";
import { withFirebase } from "../Firebase";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

const SignOutButton = ({ firebase }) => (
  <button
    className="btn btn-danger m-1"
    type="button"
    onClick={firebase.doSignOut}
  >
    <Link to={ROUTES.LANDING}>יציאה</Link>
  </button>
);
export default withFirebase(SignOutButton);
