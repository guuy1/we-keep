import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import "bootstrap/dist/css/bootstrap.css";

const Navigation = () => (
  <div>
    <div>
      <button className="btn btn-success m-1">
        <Link to={ROUTES.SHOPPING_LIST}>רשימת קניות</Link>
      </button>
      <button className="btn btn-warning m-1">סרוק מוצר</button>
      <button className="btn btn-info m-1">
        <Link to={ROUTES.SIGN_IN}>כניסה</Link>
      </button>
      <button className="btn btn-danger m-1">
        <Link to={ROUTES.SIGN_OUT}>יציאה</Link>
      </button>
    </div>
  </div>
);
export default Navigation;
