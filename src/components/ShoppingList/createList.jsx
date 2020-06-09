import React, { Component } from "react";
import ShoppingList from "./ShoppingList";
import "bootstrap/dist/css/bootstrap.css";
import { Button } from "react-bootstrap";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from "../Session";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import "./createList.scss";

const CreatList = () => {
  return (
    <AuthUserContext.Consumer>
      {(authUser) => (
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
    };
  }

  componentDidMount() {
    //import the lists of user from database
    //every time the firebase was change is update the component
    this.props.firebase.users().on("value", (snapshot) => {
      const listObject = snapshot.val();
      if (listObject) {
        const userLists = listObject[this.props.authUser.uid].lists;
        if (userLists) {
          this.setState({ _lists: userLists, key: userLists[0].key });
        } else {
          this.setState({ _lists: [], key: "" });
        }
      }
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  handleAdd() {
    //generate key with firebase to the New List
    const listKey = this.props.firebase.list().push().getKey();
    const username = this.props.authUser.username;
    const email = this.props.authUser.email;
    const roles = this.props.authUser.roles;
    const itemsExpirationKey = this.props.authUser.itemsExpirationKey;
    const { _lists } = this.state;
    const lists = [..._lists, { key: listKey }];
    //set the state and after update the database
    this.setState({ _lists: lists, key: listKey }, () => {
      this.props.firebase.user(this.props.authUser.uid).set({
        username,
        email,
        roles,
        lists,
        itemsExpirationKey,
      });
      this.setState({ key: "" }, () => {
        this.setState({ key: listKey });
      });
      this.props.firebase.list(listKey).set({
        lists: [],
        user: [this.props.authUser.uid],
        title: "רשימת קניות",
      });
    });
  }

  handleLists(item) {
    //change the state of key list to show it
    this.setState({ key: "" }, () => {
      this.setState({ key: item.key });
    });
  }

  handleDeleteList = (index) => {
    const new_lists = [...this.state._lists];
    new_lists.splice(index, 1);
    this.setState({ _lists: new_lists, key: "" });
  };

  render() {
    const { _lists } = this.state;
    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div className="create-list">
            <div className="container">
              <div className="row">
                <div className="col">
                  <Button
                    className="btn btn-primary m-1"
                    onClick={() => this.handleAdd()}
                  >
                    הוספת רשימה חדשה
                  </Button>
                  {_lists.length > 0 &&
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
                      handleDeleteList={this.handleDeleteList}
                      listKey={this.state.key}
                      authUser={authUser}
                    ></ShoppingList>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const List = withFirebase(ListComp);
const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(CreatList);
