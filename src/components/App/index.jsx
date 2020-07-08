import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import ShoppingList from "../ShoppingList/ShoppingList";
import SignOut from "../SignOut";
import CreateList from "../ShoppingList/createList";
import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session";
import SearchBarcode from "../Barcode/SearchBarcode";
import MyProducts from "../Barcode/MyProducts";
import { GlobalStyle } from "../../global.styles";

//Using the route we import differnt components
const App = () => (
  <div>
    <Router>
      <div>
        <GlobalStyle />
        <Navigation />
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
        <Route path={ROUTES.SHOPPING_LIST} component={ShoppingList} />
        <Route path={ROUTES.SIGN_OUT} component={SignOut} />
        <Route path={ROUTES.CREATE_LIST} component={CreateList} />
        <Route path={ROUTES.MY_PRODUCTS} component={MyProducts} />
        <Route path={ROUTES.SCAN_BARCODE} component={SearchBarcode} />
      </div>
    </Router>
  </div>
);

export default withAuthentication(App);
