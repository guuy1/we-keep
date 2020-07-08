import React from "react";
import { compose } from "recompose";
import { PasswordForgetForm } from "../PasswordForget";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from "../Session";
//Only an authorized user can access this page
const AccountPage = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <div>
        <h1>{authUser.email}</h1>
        <p>הכנס כתובת איימיל ואנו נשלח לך לינק לאיפוס סיסמא</p>
        <PasswordForgetForm />
        <hr />
      </div>
    )}
  </AuthUserContext.Consumer>
);
const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(AccountPage);
