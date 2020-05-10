import React from "react";
import { withFirebase } from "../Firebase";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { OptionLink } from "../Navigation/Navigation.styles";

const SignOutButton = ({ firebase }) => (
  <OptionLink type="button" onClick={firebase.doSignOut}>
    <Link to={ROUTES.LANDING}>SIGN OUT</Link>
  </OptionLink>
);
export default withFirebase(SignOutButton);
