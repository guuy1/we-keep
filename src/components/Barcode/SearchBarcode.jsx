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
import { Search, Image, List } from "semantic-ui-react";
import _ from "lodash";

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
const initialState = {
  barCode: "",
  itemsList: [],
  results: [],
  value: "",
  isLoading: false
};
const todayDate = new Date().toISOString().split("T")[0];
class BarcodeListComp extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
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
      return console.log(data.description);
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

  changeDate(event, changedItem) {
    const cloneItems = JSON.parse(JSON.stringify(this.state.itemsList));
    const currentItem = cloneItems.find(
      item => item.description === changedItem.description
    );
    currentItem.expiredDate = event.target.value;

    this.setState({ itemsList: cloneItems }, () => {
      this.props.firebase.item(this.props.authUser.itemsExpirationKey).set({
        itemsExpiration: [...this.state.itemsList],
        user: [this.props.authUser.uid]
      });
    });
  }

  handleDelete(index) {
    //delete specific item from list
    const { itemsList } = this.state;
    const newItems = [...itemsList];
    newItems.splice(index, 1);
    if (newItems.length > 0) {
      this.setState({ itemsList: newItems }, () => {
        this.props.firebase.item(this.props.authUser.itemsExpirationKey).set({
          itemsExpiration: [...this.state.itemsList],
          user: [this.props.authUser.uid]
        });
      });
    } else {
      this.setState({ itemsList: newItems }, () => {
        this.props.firebase
          .item(this.props.authUser.itemsExpirationKey)
          .remove();
      });
    }
  }

  handleResultSelect = (e, { result }) => {
    result.expiredDate = todayDate;
    this.setState(
      prevState => {
        return {
          itemsList: [...prevState.itemsList, result],
          value: "",
          results: []
        };
      },
      () => {
        this.props.firebase.item(this.props.authUser.itemsExpirationKey).set({
          itemsExpiration: [...this.state.itemsList],
          user: [this.props.authUser.uid]
        });
      }
    );
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });
    console.log(value);

    setTimeout(() => {
      if (this.state.value.length === 0) return this.setState(initialState);

      if (this.state.value.length > 3) {
        let currentItems = data.Items.Item.filter(item => {
          return item.ItemCode.endsWith(value);
        });

        currentItems = currentItems.map(item => {
          const imgURL = this.getItemImageURL(item.ItemCode);
          item.image = imgURL;
          item.expiredDate = todayDate;

          return {
            title: item.ItemName,
            description: item.ItemCode,
            image: item.image
          };
        });

        this.setState({
          isLoading: false,
          results: currentItems
        });
      }
    }, 300);
  };
  render() {
    const { isLoading, value, results } = this.state;

    return (
      <AuthUserContext.Consumer>
        {() => (
          <div id="content">
            <h1 align="center">המוצרים שלי</h1>
            <div className="row m-1">
              <div className="col" id="search-section">
                <Search
                  loading={isLoading}
                  onResultSelect={this.handleResultSelect}
                  onSearchChange={_.debounce(this.handleSearchChange, 500, {
                    leading: true
                  })}
                  results={results}
                  value={value}
                />
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
                            src={item.image}
                            alt=""
                          />
                          <List.Content>
                            <List.Header>שם המוצר : {item.title}</List.Header>
                            ברקוד: {item.description}
                            <div>
                              <input
                                type="date"
                                id="start"
                                name="trip-start"
                                value={item.expiredDate || todayDate}
                                min={todayDate}
                                onChange={event => this.changeDate(event, item)}
                              />
                            </div>
                            <button
                              className="negative compact ui button m-1"
                              onClick={() => this.handleDelete(index)}
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
