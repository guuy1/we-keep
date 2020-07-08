import React, { Component } from "react";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from "../Session";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import "bootstrap/dist/css/bootstrap.css";
import data from "../Data/items.json";
import defaultPhoto from "../Data/defaultImage.png";
import { Search, Image, List } from "semantic-ui-react";
import _ from "lodash";
import "./MyProducts.scss";
import styled from "styled-components";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import classNames from "classnames";

const InputStyle = styled.div`
  font-family: "Heebo";
`;

const ButtonStyle = styled.button`
  width: 40px !important;
  font-size: x-small !important;
  margin-top: 10px !important;
`;

//This page show all products that was scan or add by user
const MyProducts = () => {
  return (
    <AuthUserContext.Consumer>
      {(authUser) => (
        <div>
          <BarcodeList authUser={authUser} />
        </div>
      )}
    </AuthUserContext.Consumer>
  );
};
const initialState = {
  itemsList: [],
  results: [],
  value: "",
  isLoading: false,
  notify: false,
};
const todayDate = new Date().toISOString().split("T")[0];
class BarcodeListComp extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    //import the Items from DB
    this.props.firebase.items().on("value", (snapshot) => {
      const itemsObject = snapshot.val();
      if (itemsObject && itemsObject[this.props.authUser.itemsExpirationKey]) {
        const userItems =
          itemsObject[this.props.authUser.itemsExpirationKey].itemsExpiration;
        this.setState({
          itemsList: userItems,
        });
      }
    });
  }

  componentWillUnmount() {
    this.props.firebase.items().off();
  }

  //if product image doesn't exist set to default image
  defaultImage = (e, description) => {
    e.target.src = defaultPhoto;
    const newResults = this.state.results.map((item) => {
      if (description === item.description) {
        item.image = defaultPhoto;
      }
      return item;
    });
    return this.setState({ result: newResults });
  };

  //Display product after search
  resultRenderer = ({ image, price, title, description }) => [
    image && (
      <div key="image" className="image">
        <Image src={image} onError={(e) => this.defaultImage(e, description)} />
      </div>
    ),
    <div key="content" className="content">
      {price && <div className="price">{price}</div>}
      {title && <div className="title">{title}</div>}
      {description && <div className="description">{description}</div>}
    </div>,
  ];

  getItemImageURL(barcode) {
    const url = `http://m.pricez.co.il/ProductPictures/${barcode}.jpg`;
    return url;
  }

  //change the date on product and update the DB
  changeDate(event, changedItem) {
    const cloneItems = JSON.parse(JSON.stringify(this.state.itemsList));
    const currentItem = cloneItems.find(
      (item) => item.itemKey === changedItem.itemKey
    );
    currentItem.expiredDate = event.target.value;

    this.setState({ itemsList: cloneItems }, () => {
      this.props.firebase.item(this.props.authUser.itemsExpirationKey).set({
        itemsExpiration: [...this.state.itemsList],
        user: [this.props.authUser.uid],
      });
    });
  }

  //delete specific item from list
  handleDelete(index) {
    const { itemsList } = this.state;
    const newItems = [...itemsList];
    newItems.splice(index, 1);
    if (newItems.length > 0) {
      this.setState({ itemsList: newItems }, () => {
        this.props.firebase.item(this.props.authUser.itemsExpirationKey).set({
          itemsExpiration: [...this.state.itemsList],
          user: [this.props.authUser.uid],
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

  //choose result from list after searching manually and add to user products
  handleResultSelect = (e, { result }) => {
    const itemKey = this.props.firebase.item().push().getKey();
    result.expiredDate = todayDate;
    result.itemKey = itemKey;
    this.setState(
      (prevState) => {
        return {
          itemsList: [...prevState.itemsList, result],
          value: "",
          results: [],
        };
      },
      () => {
        this.props.firebase.item(this.props.authUser.itemsExpirationKey).set({
          itemsExpiration: [...this.state.itemsList],
          user: [this.props.authUser.uid],
        });
      }
    );
  };

  //manually searching
  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length === 0)
        return this.setState({
          results: [],
          value: "",
          isLoading: false,
        });

      if (this.state.value.length > 3) {
        let currentItems = data.Items.Item.filter((item) => {
          return item.ItemCode.endsWith(value);
        });

        currentItems = currentItems.map((item) => {
          const imgURL = this.getItemImageURL(item.ItemCode);
          item.image = imgURL;
          item.expiredDate = todayDate;

          return {
            title: item.ItemName,
            description: item.ItemCode,
            image: item.image,
          };
        });

        this.setState({
          isLoading: false,
          results: currentItems,
        });
      }
    }, 300);
  };

  //alert before delete item
  deleteDialog = (index) => {
    confirmAlert({
      title: "מחיקת מוצר",
      message: "?האם אתה בטוח שברצונך למחוק מוצר זה",
      buttons: [
        {
          label: "כן",
          onClick: () => this.handleDelete(index),
        },
        {
          label: "לא",
          onClick: () => {},
        },
      ],
    });
  };

  render() {
    const { isLoading, value, results /*notify*/ } = this.state;

    return (
      <AuthUserContext.Consumer>
        {() => (
          <div id="content">
            <h1 align="center">המוצרים שלי</h1>
            <div className="row m-1">
              <div className="col" id="search-section">
                <Search
                  className="search"
                  loading={isLoading}
                  onResultSelect={this.handleResultSelect}
                  onSearchChange={_.debounce(this.handleSearchChange, 500, {
                    leading: true,
                  })}
                  results={results}
                  resultRenderer={this.resultRenderer}
                  value={value}
                  placeholder="חפש בעזרת 4 ספרות אחרונות של הברקוד "
                />
              </div>
            </div>

            <div className="row m-1 items-container">
              {/*compare between product expiration date to real date and mark product in color by there state.
              green for valid products, yellow for products that are about to be expiered and red for expiered products*/}
              {this.state.itemsList.length > 0 &&
                this.state.itemsList.map((item, index) => {
                  const now = new Date();
                  const itemDate = new Date(item.expiredDate);
                  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                  const firstDate = new Date(itemDate);
                  const secondDate = new Date(now);
                  firstDate.setHours(0); // change time zone GMT/UTC +0 hours to handle on local time

                  const diffDays = Math.ceil((firstDate - secondDate) / oneDay); //rounding up

                  const isExpired = diffDays <= 0;
                  const almostExpired = diffDays <= 3 && diffDays > 0;
                  const liClasses = classNames({
                    expired: isExpired,
                    "almost-expired": almostExpired,
                    "not-expired": !almostExpired && !isExpired,
                    "item-width": true,
                  });
                  let daysLeft;
                  if (diffDays === 0) {
                    daysLeft = (
                      <span className="days-left">
                        {" "}
                        <span>המוצר פג תוקף היום</span>
                      </span>
                    );
                  } else if (diffDays === 1) {
                    daysLeft = (
                      <span className="days-left">
                        {" "}
                        <span>המוצר פג תוקף מחר</span>
                      </span>
                    );
                  } else if (isExpired) {
                    daysLeft = (
                      <span className="days-left">
                        {" "}
                        <span>המוצר פג תוקף </span>
                        <span>{Math.abs(diffDays)}</span>
                        <span> ימים</span>
                      </span>
                    );
                  } else {
                    daysLeft = (
                      <span className="days-left">
                        {" "}
                        <span>המוצר פג תוקף בעוד </span>
                        <span>{diffDays}</span>
                        <span> ימים</span>
                      </span>
                    );
                  }
                  return (
                    <div key={index} className={liClasses}>
                      <List celled>
                        <List.Item>
                          <Image
                            avatar
                            style={{ fontSize: 50 }}
                            src={item.image}
                            alt=""
                          />
                          <List.Content>
                            <List.Header>מוצר:{item.title}</List.Header>
                            ברקוד: {item.description}
                            <InputStyle>
                              <input
                                type="date"
                                id="start"
                                name="trip-start"
                                value={item.expiredDate || todayDate}
                                min={todayDate}
                                onChange={(event) =>
                                  this.changeDate(event, item)
                                }
                              />
                            </InputStyle>
                            {daysLeft}
                            <ButtonStyle
                              className="negative ui button "
                              onClick={() => this.deleteDialog(index)}
                            >
                              <i className="fa fa-trash fa-lg"></i>
                            </ButtonStyle>
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
const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(MyProducts);
