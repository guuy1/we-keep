import React, { Component } from "react";
import { compose } from "recompose";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from "../Session";
import { withFirebase } from "../Firebase";
import Title from "./Title";
import Menu from "./Menu";
import "./ShoppingList.scss";
import "font-awesome/css/font-awesome.min.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const ShoppingList = ({ handleDeleteList, listKey, authUser }) => {
  return (
    <div>
      <Shopping
        handleDeleteList={handleDeleteList}
        listKey={listKey}
        authUser={authUser}
      />
    </div>
  );
};
class ShoppingListComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
      lists: [],
      userLists: [],
      title: "",
    };
  }

  componentDidMount() {
    //import the lists of user
    this.props.firebase.users().on("value", (snapshot) => {
      const listObject = snapshot.val();
      if (listObject) {
        const userLists = listObject[this.props.authUser.uid].lists;
        if (userLists) {
          this.setState({ userLists: userLists });
        }
      }
    });

    //import the specific list to show the items
    this.props.firebase.lists().on("value", (snapshot) => {
      const listObject = snapshot.val();
      if (listObject && listObject[this.props.listKey]) {
        this.setState({ title: listObject[this.props.listKey].title });
        const items = listObject[this.props.listKey].list;
        if (items)
          this.setState({
            lists: items,
          });
      }
    });
  }

  componentWillUnmount() {
    this.props.firebase.lists().off();
    this.props.firebase.users().off();
  }

  handleAdd(e) {
    e.preventDefault();
    if (!this.state.item) return; // don't add empty item to array
    //add new item to list in state
    this.setState(
      (prevState) => {
        if (prevState.lists) {
          return {
            lists: [
              ...prevState.lists,
              { item: prevState.item, isComplete: false },
            ],
            item: "",
          };
        } else {
          return {
            lists: [{ item: prevState.item, isComplete: false }],
            item: "",
          };
        }
      },
      //after adding the item update the datatbase
      () => {
        this.props.firebase.list(this.props.listKey).set({
          title: this.state.title,
          list: [...this.state.lists],
          user: [this.props.authUser.uid],
        });
      }
    );
  }

  handleComplete(index) {
    //mark the item to complete or not
    const { lists } = this.state;
    const newItems = [...lists];
    newItems.splice(index, 1, {
      item: lists[index].item,
      isComplete: !lists[index].isComplete,
    });
    this.setState({ lists: newItems }, () => {
      this.props.firebase.list(this.props.listKey).set({
        title: this.state.title,
        list: [...this.state.lists],
        user: [this.props.authUser.uid],
      });
    });
  }

  handleUpdateItem(e) {
    this.setState({ item: e.target.value });
  }

  handleUpdateItems(e, index) {
    //update the lists in list (not new ones)
    const { lists } = this.state;
    const newItems = [...lists];
    newItems.splice(index, 1, {
      item: e.target.value,
      isComplete: lists[index].isComplete,
    });
    this.setState({ lists: newItems }, () => {
      this.props.firebase.list(this.props.listKey).set({
        title: this.state.title,
        list: [...this.state.lists],
        user: [this.props.authUser.uid],
      });
    });
  }

  handleDelete(index) {
    //delete specific item from list
    const { lists } = this.state;
    const newItems = [...lists];
    newItems.splice(index, 1);
    this.setState({ lists: newItems }, () => {
      this.props.firebase.list(this.props.listKey).set({
        title: this.state.title,
        list: [...this.state.lists],
        user: [this.props.authUser.uid],
      });
    });
  }

  handleRemove() {
    //if user clicked delete the list from "Menu" Copmponent
    // it's call here to change the state
    this.setState({ lists: [] });
    if (this.state.userLists) {
      const index = this.state.userLists.findIndex(
        (target) => target.key === this.props.listKey
      );
      const username = this.props.authUser.username;
      const email = this.props.authUser.email;
      const roles = this.props.authUser.roles;
      const itemsExpirationKey = this.props.authUser.itemsExpirationKey;
      const { userLists } = this.state;
      const lists = [...userLists];
      lists.splice(index, 1);
      //update the lists from user
      this.props.firebase.user(this.props.authUser.uid).set({
        username,
        email,
        roles,
        lists,
        itemsExpirationKey,
      });
      //remove the list and update the state in CreateList Comp
      this.props.handleDeleteList(index);
      this.props.firebase.list(this.props.listKey).remove();
    }
  }

  deleteDialog = () => {
    confirmAlert({
      title: "מחיקת רשימה",
      message: "?האם אתה בטוח שברצונך למחוק רשימה זו",
      buttons: [
        {
          label: "כן",
          onClick: () => this.handleRemove(),
        },
        {
          label: "לא",
          onClick: () => {},
        },
      ],
    });
  };

  render() {
    const { lists, item } = this.state;
    return (
      <AuthUserContext.Consumer>
        {() => (
          <div className="shopping-list">
            <div className="itemContainer">
              <Title listKey={this.props.listKey} />
              <form onSubmit={(e) => this.handleAdd(e)} className="itemsForm">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => this.handleUpdateItem(e)}
                  placeholder="מוצר חדש"
                />
              </form>
              {lists &&
                lists
                  .sort((a, b) => a.isComplete - b.isComplete)
                  .map((target, index) => (
                    <div key={index}>
                      <form
                        onSubmit={(e) => this.handleAdd(e)}
                        className="itemsForm"
                        key={index}
                      >
                        <div>
                          <i
                            className={
                              target.isComplete
                                ? "far fa-check-square m-1"
                                : "far fa-square m-1"
                            }
                            onClick={() => this.handleComplete(index)}
                          />
                          <input
                            type="text"
                            value={target.item}
                            onChange={(e) => this.handleUpdateItems(e, index)}
                            style={{
                              textDecoration:
                                target.isComplete && "line-through",
                            }}
                          />
                        </div>
                        <i
                          className="fas fa-times"
                          onClick={() => this.handleDelete(index)}
                        />
                      </form>
                      <hr></hr>
                    </div>
                  ))}
              <hr />
              <Menu deleteDialog={() => this.deleteDialog()} />
            </div>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}
const Shopping = withFirebase(ShoppingListComp);
const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(ShoppingList);
