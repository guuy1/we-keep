import React from "react";
import * as ROUTES from "../../constants/routes";
import SignOutButton from "../SignOut";
import "bootstrap/dist/css/bootstrap.css";
import { AuthUserContext } from "../Session";
import { ReactComponent as Logo } from "../Data/logo.svg";
import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
  Option1Link,
} from "./Navigation.styles";

//Nav bar Comp
const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {(authUser) =>
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
  <HeaderContainer>
    <LogoContainer to={ROUTES.HOME}>
      <Logo className="logo" />
    </LogoContainer>
    <OptionsContainer>
      <Option1Link to={ROUTES.HOME}>WeKeep</Option1Link>
      <OptionLink to={ROUTES.ACCOUNT}>החשבון שלי</OptionLink>
      <SignOutButton />
    </OptionsContainer>
  </HeaderContainer>
);

const NavigationNonAuth = () => (
  <HeaderContainer>
    <LogoContainer to={ROUTES.LANDING}>
      <Logo className="logo" />
    </LogoContainer>
    <OptionsContainer>
      <Option1Link to={ROUTES.LANDING}>WeKeep</Option1Link>
      <OptionLink to={ROUTES.SIGN_IN}>התחבר</OptionLink>
    </OptionsContainer>
  </HeaderContainer>
);

export default Navigation;
