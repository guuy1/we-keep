import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import SignOutButton from "../SignOut";
import "bootstrap/dist/css/bootstrap.css";
import { AuthUserContext } from "../Session";
import * as ROLES from "../../constants/roles";

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <NavigationAuth authUser={authUser} />
        ) : (
          <NavigationNonAuth />
        )
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = ({ authUser }) => (
  <div>
    <div>
      <button className="btn btn-light m-1">
        <Link to={ROUTES.CREATE_LIST}>רשימות קניות</Link>
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
      {!!authUser.roles[ROLES.ADMIN] && (
        <button className="btn btn-light m-1">
          <li>
            <Link to={ROUTES.ADMIN}>Admin</Link>
          </li>
        </button>
      )}

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
