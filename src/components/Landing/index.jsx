import React from "react";
import { Link } from "react-router-dom";
import "./Landing.scss";
import * as ROUTES from "../../constants/routes";

class Landing extends React.Component {
  render() {
    return (
      <div className="about-us">
        <h1 className="title">Welcome to WeKeep</h1>
        <h3 className="sub">
          The purpose of this App is to improve the management of your
          HousKeeping, With an emphasis on managing the refrigerator.
        </h3>
        <h3 className="sub">
          Our App also help to improve the family communication relating to the
          management of the household, such as a grocery shopping list
        </h3>
        <h3 className="sub1">Join Us And Make Your Life More Organized </h3>
        <Link to={ROUTES.SIGN_UP}>
          <button className="button" type="button">
            sign up now
          </button>
        </Link>
      </div>
    );
  }
}

export default Landing;
