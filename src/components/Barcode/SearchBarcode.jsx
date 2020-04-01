import React, { Component } from "react";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification
} from "../Session";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import "bootstrap/dist/css/bootstrap.css";
import data from "../Data/items.json";
import { Image, List } from "semantic-ui-react";

const SearchBarcode = () => {
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <BarcodeList authUser={authUser} />
        </div>
      )}
    </AuthUserContext.Consumer>
  );
};

class BarcodeListComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barCode: "",
      itemsList: []
    };
  }

  componentDidMount() {
    //import the Items from DB
    this.props.firebase.items().on("value", snapshot => {
      const itemsObject = snapshot.val();
      if (itemsObject && itemsObject[this.props.authUser.itemsExpirationKey]) {
        const userItems =
          itemsObject[this.props.authUser.itemsExpirationKey].itemsExpiration;
        this.setState({
          itemsList: userItems
        });
      }
    });
  }

  componentWillUnmount() {
    this.props.firebase.items().off();
  }

  newData(data) {
    data.Items.Item.map(data => {
      return console.log(data.ItemCode);
    });
  }

  barCodeValidation(event) {
    const barCodeValue = event.target.value;
    if (barCodeValue.length > 4) return;
    this.setState({ barCode: barCodeValue });
  }

  getItemImageURL(barcode) {
    const url = `http://m.pricez.co.il/ProductPictures/${barcode}.jpg`;
    return url;
  }

  changeDate(authUser, event, changedItem) {
    const cloneItems = JSON.parse(JSON.stringify(this.state.itemsList));
    const currentItem = cloneItems.find(
      item => item.ItemCode === changedItem.ItemCode
    );
    currentItem.expiredDate = event.target.value;

    this.setState({ itemsList: cloneItems }, () => {
      this.props.firebase.item(authUser.itemsExpirationKey).set({
        itemsExpiration: [...this.state.itemsList],
        user: [authUser.uid]
      });
    });
  }

  searchData(authUser, data) {
    const currentItems = data.Items.Item.filter(item => {
      return item.ItemCode.endsWith(this.state.barCode);
    });

    if (currentItems.length === 0) {
      return;
    }
    const newItems = currentItems.map(item => {
      const imgURL = this.getItemImageURL(item.ItemCode);
      item.imgURL = imgURL;
      item.expiredDate = new Date().toISOString().split("T")[0];
      return item;
    });

    this.setState(
      prevState => {
        return {
          itemsList: [...prevState.itemsList, ...newItems],
          barCode: ""
        };
      },
      () => {
        this.props.firebase.item(authUser.itemsExpirationKey).set({
          itemsExpiration: [...this.state.itemsList],
          user: [authUser.uid]
        });
      }
    );
  }

  handleDelete(index, authUser) {
    //delete specific item from list
    const { itemsList } = this.state;
    const newItems = [...itemsList];
    newItems.splice(index, 1);
    if (newItems.length > 0) {
      this.setState({ itemsList: newItems }, () => {
        this.props.firebase.item(authUser.itemsExpirationKey).set({
          itemsExpiration: [...this.state.itemsList],
          user: [authUser.uid]
        });
      });
    } else {
      this.setState({ itemsList: newItems }, () => {
        this.props.firebase.item(authUser.itemsExpirationKey).remove();
      });
    }
  }

  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div id="content">
            <h1 align="center">המוצרים שלי</h1>
            <div className="row m-1">
              <div className="col" id="search-section">
                <form
                  action=""
                  onSubmit={e => {
                    e.preventDefault();
                    this.searchData(authUser, data);
                  }}
                >
                  <input
                    id="search"
                    placeholder="Search Barcode"
                    type="number"
                    value={this.state.barCode}
                    onChange={e => this.barCodeValidation(e)}
                    required
                  ></input>
                  <button
                    className="btn btn-primary m-1"
                    type="submit"
                    disabled={this.state.barCode.length !== 4}
                  >
                    Search
                  </button>
                </form>
                <div></div>
              </div>
              <div className="col">
                <button
                  className="btn btn-primary m-1"
                  onClick={() => this.newData(data)}
                >
                  Scan
                </button>
              </div>
            </div>

            <div className="row m-1">
              {this.state.itemsList.length > 0 &&
                this.state.itemsList.map((item, index) => {
                  return (
                    <div key={index}>
                      <List celled>
                        <List.Item>
                          <Image
                            avatar
                            style={{ fontSize: 50 }}
                            src={item.imgURL}
                            alt=""
                          />
                          <List.Content>
                            <List.Header>
                              שם המוצר : {item.ItemName}
                            </List.Header>
                            ברקוד: {item.ItemCode}
                            <div>
                              <input
                                type="date"
                                id="start"
                                name="trip-start"
                                value={item.expiredDate}
                                min={new Date().toISOString().split("T")[0]}
                                onChange={event =>
                                  this.changeDate(authUser, event, item)
                                }
                              />
                            </div>
                            <button
                              className="negative compact ui button m-1"
                              onClick={() => this.handleDelete(index, authUser)}
                            >
                              מחק מוצר
                            </button>
                          </List.Content>
                        </List.Item>
                      </List>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const BarcodeList = withFirebase(BarcodeListComp);
const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(SearchBarcode);
