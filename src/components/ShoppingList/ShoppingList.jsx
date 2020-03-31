import React, { Component } from "react";
import { compose } from "recompose";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification
} from "../Session";
import { withFirebase } from "../Firebase";
import Title from "./Title";
import Menu from "./Menu";
import "./ShoppingList.css";
import "font-awesome/css/font-awesome.min.css";

const ShoppingList = ({ listKey, authUser }) => {
  return (
    <div>
      <Shopping listKey={listKey} authUser={authUser} />
    </div>
  );
};
class ShoppingListComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
      lists: [],
      userLists: []
    };
  }

  componentDidMount() {
    //import the lists of user
    this.props.firebase.users().on("value", snapshot => {
      const listObject = snapshot.val();
      if (listObject) {
        const userLists = listObject[this.props.authUser.uid].lists;
        if (userLists) {
          this.setState({ userLists: userLists });
        }
      }
    });

    //import the specific list to show the items
    this.props.firebase.lists().on("value", snapshot => {
      const listObject = snapshot.val();
      if (listObject && listObject[this.props.listKey]) {
        const items = listObject[this.props.listKey];
        this.setState({
          lists: items.list
        });
      }
    });
  }

  componentWillUnmount() {
    this.props.firebase.lists().off();
    this.props.firebase.users().off();
  }

  handleAdd(e, authUser) {
    e.preventDefault();
    if (!this.state.item) return; // don't add empty item to array
    //add new item to list in state
    this.setState(
      prevState => {
        if (prevState.lists) {
          return {
            lists: [
              ...prevState.lists,
              { item: prevState.item, isComplete: false }
            ],
            item: ""
          };
        } else {
          return {
            lists: [{ item: prevState.item, isComplete: false }],
            item: ""
          };
        }
      },
      //after adding the item update the datatbase
      () => {
        this.props.firebase.list(this.props.listKey).set({
          list: [...this.state.lists],
          user: [authUser.uid]
        });
      }
    );
  }

  handleComplete(index, authUser) {
    //mark the item to complete or not
    const { lists } = this.state;
    const newItems = [...lists];
    newItems.splice(index, 1, {
      item: lists[index].item,
      isComplete: !lists[index].isComplete
    });
    this.setState({ lists: newItems }, () => {
      this.props.firebase.list(this.props.listKey).set({
        list: [...this.state.lists],
        user: [authUser.uid]
      });
    });
  }

  handleUpdateItem(e) {
    this.setState({ item: e.target.value });
  }

  handleUpdateItems(e, index, authUser) {
    //update the lists in list (not new ones)
    const { lists } = this.state;
    const newItems = [...lists];
    newItems.splice(index, 1, {
      item: e.target.value,
      isComplete: lists[index].isComplete
    });
    this.setState({ lists: newItems }, () => {
      this.props.firebase.list(this.props.listKey).set({
        list: [...this.state.lists],
        user: [authUser.uid]
      });
    });
  }

  handleDelete(index, authUser) {
    //delete specific item from list
    const { lists } = this.state;
    const newItems = [...lists];
    newItems.splice(index, 1);
    this.setState({ lists: newItems }, () => {
      this.props.firebase.list(this.props.listKey).set({
        list: [...this.state.lists],
        user: [authUser.uid]
      });
    });
  }

  handleRemove(authUser) {
    //if user clicked delete the list from "Menu" Copmponent
    // it's call here to change the state
    this.setState({ lists: [] });
    if (this.state.userLists) {
      const index = this.state.userLists.findIndex(
        target => target.key === this.props.listKey
      );
      const username = authUser.username;
      const email = authUser.email;
      const roles = authUser.roles;
      const itemsExpirationKey = authUser.itemsExpirationKey;
      const { userLists } = this.state;
      const lists = [...userLists];
      lists.splice(index, 1);
      //update the lists from user
      this.props.firebase.user(authUser.uid).set({
        username,
        email,
        roles,
        lists,
        itemsExpirationKey
      });
      //remove the list
      this.props.firebase.list(this.props.listKey).remove();
    }
  }

  render() {
    const { lists, item } = this.state;
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div className="shopping-list">
            <div className="itemContainer">
              <Title listKey={this.props.listKey} />
              {lists &&
                lists.map((target, index) => (
                  <form
                    onSubmit={e => this.handleAdd(e, authUser)}
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
                        onClick={() => this.handleComplete(index, authUser)}
                      />
                      <input
                        type="text"
                        value={target.item}
                        onChange={e =>
                          this.handleUpdateItems(e, index, authUser)
                        }
                        style={{
                          textDecoration: target.isComplete && "line-through"
                        }}
                      />
                    </div>
                    <i
                      className="fas fa-times"
                      onClick={() => this.handleDelete(index, authUser)}
                    />
                  </form>
                ))}

              <form
                onSubmit={e => this.handleAdd(e, authUser)}
                className="itemsForm"
              >
                <i className="fas fa-plus m-2" />
                <input
                  type="text"
                  value={item}
                  onChange={e => this.handleUpdateItem(e)}
                  placeholder="List Item"
                />
              </form>
              <hr />
              <Menu handleRemove={() => this.handleRemove(authUser)} />
            </div>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}
const Shopping = withFirebase(ShoppingListComp);
const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(ShoppingList);
