import React, { Component } from "react";
import { compose } from "recompose";
import "./Menu.css";
import "font-awesome/css/font-awesome.min.css";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification
} from "../Session";
import { withFirebase } from "../Firebase";

const Menu = ({ handleRemove }) => {
  return (
    <div>
      <HendleMenu handleRemove={handleRemove} />
    </div>
  );
};

class MenuComp extends Component {
  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <section className="menu">
            {/*use with Parent function to remove the list and clear the state*/}
            <i className="far fa-trash-alt" onClick={this.props.handleRemove} />
            <i className="far fa-clone" />
          </section>
        )}
      </AuthUserContext.Consumer>
    );
  }
}
const HendleMenu = withFirebase(MenuComp);
const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(Menu);
