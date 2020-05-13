import React from "react";
import { withFirebase } from "../Firebase";
import "bootstrap/dist/css/bootstrap.css";
import * as ROUTES from "../../constants/routes";
import { OptionLink } from "../Navigation/Navigation.styles";

const SignOutButton = ({ firebase }) => (
  <OptionLink type="button" onClick={firebase.doSignOut} to={ROUTES.LANDING}>
    התנתק
  </OptionLink>
);
export default withFirebase(SignOutButton);
