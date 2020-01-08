import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import SignOutButton from "../SignOut";
import "bootstrap/dist/css/bootstrap.css";
import { AuthUserContext } from "../Session";

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  <div>
    <div>
      <button className="btn btn-light m-1">
        <Link to={ROUTES.SHOPPING_LIST}>רשימת קניות</Link>
      </button>
      <button className="btn btn-light m-1">
        <Link to={ROUTES.LANDING}>Landing</Link>
      </button>
      <button className="btn btn-light m-1">
        <Link to={ROUTES.HOME}>Home</Link>
      </button>
      <button className="btn btn-light m-1">
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </button>
      <SignOutButton />
    </div>
  </div>
);

const NavigationNonAuth = () => (
  <div>
    <div>
      <button className="btn btn-light m-1">
        <Link to={ROUTES.LANDING}>Landing</Link>
      </button>
      <button className="btn btn-light m-1">
        <Link to={ROUTES.SIGN_IN}>כניסה</Link>
      </button>
    </div>
  </div>
);

export default Navigation;
