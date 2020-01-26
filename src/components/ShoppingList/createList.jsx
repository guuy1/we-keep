import React, { Component } from "react";
import ShoppingList from "./ShoppingList";
import "bootstrap/dist/css/bootstrap.css";
import { Button } from "react-bootstrap";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification
} from "../Session";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";

const CreatList = () => {
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <List authUser={authUser} />
        </div>
      )}
    </AuthUserContext.Consumer>
  );
};

class ListComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _lists: [],
      key: "",
      flag: true
    };
  }

  componentDidMount() {
    //import the lists of user from database
    this.props.firebase.users().on("value", snapshot => {
      const listObject = snapshot.val();
      if (listObject) {
        const userLists = listObject[this.props.authUser.uid].lists;
        if (userLists) {
          this.setState({ _lists: userLists });
        }
      }
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  handleAdd(authUser) {
    //generate key with firebase to the New List
    const listKey = this.props.firebase
      .list()
      .push()
      .getKey();
    const username = authUser.username;
    const email = authUser.email;
    const roles = authUser.roles;
    const { _lists } = this.state;
    const lists = [..._lists, { key: listKey }];
    //set the state and after update the database
    this.setState({ _lists: lists, key: listKey, flag: true }, () => {
      this.props.firebase.user(authUser.uid).set({
        username,
        email,
        roles,
        lists
      });
      this.props.firebase.list(listKey).set({
        lists: [],
        user: [authUser.uid]
      });
    });
  }

  showLists(_lists) {
    console.log(_lists);
  }

  handleLists(item) {
    //change the state of key list to show it
    this.setState({ key: "" }, () => {
      this.setState({ key: item.key });
    });
  }

  handleListsState() {
    //import from database the lists of user and update the state
    this.props.firebase.users().on("value", snapshot => {
      const listObject = snapshot.val();
      if (listObject) {
        const userLists = listObject[this.props.authUser.uid].lists;
        // console.log(userLists);//FIX IT
        if (userLists) {
          //update the lists in state
          this.setState({ _lists: userLists, key: "" });
        } else {
          //if the user delete the last list
          // key = "" hide the component ShoppingList from screen
          this.setState({ _lists: [], key: "", flag: false });
          // console.log(this.state._lists, this.state.flag); // FIX IT
        }
      }
    });
  }
  render() {
    const { _lists, flag } = this.state;
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div className="container">
            <div className="row">
              <div className="col">
                <Button
                  className="btn btn-primary m-1"
                  onClick={() => this.handleAdd(authUser)}
                >
                  הוספת רשימה חדשה
                </Button>
                {/* <button
                  className="btn btn-warning m-1"
                  onClick={() => this.showLists(_lists)}
                >
                  lists
                </button> */}
                {flag &&
                  _lists &&
                  _lists.map((item, index) => (
                    <Button
                      key={index}
                      className="btn btn-secondary m-1"
                      onClick={() => this.handleLists(item)}
                    >
                      {index + 1}
                    </Button>
                  ))}
              </div>
            </div>
            <div className="row">
              <div className="col">
                {this.state.key ? (
                  <ShoppingList
                    listKey={this.state.key}
                    authUser={authUser}
                    handleListsState={() => this.handleListsState()}
                  ></ShoppingList>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const List = withFirebase(ListComp);
const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(CreatList);
