import React from "react";
import { compose } from "recompose";
import { withAuthorization, withEmailVerification } from "../Session";
import Directory from "../Directory/directory";
import { HomePageContainer } from "./Home.styles";
const HomePage = () => (
  <HomePageContainer>
    <Directory />
  </HomePageContainer>
);
const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(HomePage);
