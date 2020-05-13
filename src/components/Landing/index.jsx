import React from "react";
import { Link } from "react-router-dom";
import "./Landing.scss";
import * as ROUTES from "../../constants/routes";
import CustomButton from "../CustomButton/CustomButton";

class Landing extends React.Component {
  render() {
    return (
      <div className="about-us">
        <h1 className="title">Welcome to WeKeep</h1>
        <p className="sub">
          The purpose of this App is to improve the management of your
          HousKeeping, With an emphasis on managing the refrigerator.
        </p>
        <p className="sub">
          Our App also help to improve the family communication relating to the
          management of the household, such as a grocery shopping list
        </p>
        <p className="sub1">Join Us And Make Your Life More Organized </p>
        <Link to={ROUTES.SIGN_UP}>
          <CustomButton>sign up now</CustomButton>
        </Link>
      </div>
    );
  }
}

export default Landing;
