import React, { Component } from "react";
import { compose } from "recompose";
import "./Menu.css";
import "font-awesome/css/font-awesome.min.css";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from "../Session";
import { withFirebase } from "../Firebase";

const Menu = ({ deleteDialog }) => {
  return (
    <div>
      <HendleMenu deleteDialog={deleteDialog} />
    </div>
  );
};

class MenuComp extends Component {
  render() {
    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <section className="menu">
            {/*use with Parent function to remove the list and clear the state*/}
            <i
              className="far fa-trash-alt m-1"
              onClick={this.props.deleteDialog}
            />
          </section>
        )}
      </AuthUserContext.Consumer>
    );
  }
}
const HendleMenu = withFirebase(MenuComp);
const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(Menu);
