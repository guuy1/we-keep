import React from "react";
import { compose } from "recompose";
import { PasswordForgetForm } from "../PasswordForget";
//import PasswordChangeForm from "../PasswordChange";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from "../Session";

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <div>
        <h1>{authUser.email}</h1>
        <p>הכנס כתובת איימיל ואנו נשלח לך לינק לאיפוס סיסמא</p>
        <PasswordForgetForm />
        <hr />
        {/* <PasswordChangeForm /> */}
      </div>
    )}
  </AuthUserContext.Consumer>
);
const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(AccountPage);
