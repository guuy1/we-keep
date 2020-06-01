import React, { Component } from "react";
import Scanner from "./Scanner";
import data from "../Data/items.json";
import { compose } from "recompose";
import { withAuthorization, withEmailVerification } from "../Session";
import { withFirebase } from "../Firebase";
import Quagga from "quagga";
// import Popup from "./Popup";

const QuaggaComp = ({ scanBarcode }) => {
  return <QuaggaC scanBarcode={scanBarcode} />;
};
class QuaggaReact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scanning: false,
      results: [],
      showPopup: false,
    };
  }

  // togglePopup = () => {
  //   this.setState((prevState) => {
  //     return { showPopup: !prevState.showPopup };
  //   });
  // };

  _scan = () => {
    this.setState((prevState) => {
      return { scanning: !prevState.scanning };
    });
  };

  _onDetected = (result) => {
    let res = data.Items.Item.find((item) => {
      if (item.ItemCode === result.codeResult.code) return item.ItemCode;
      return null;
    });
    // this.setState((prevState) => {
    //   return { showPopup: !prevState.showPopup };
    // });
    if (res) {
      Quagga.stop();
      this.setState(
        (prevState) => {
          return { scanning: !prevState.scanning };
        },
        () => this.props.scanBarcode(res)
      );
    }
  };

  // addItemCloseScan = () => {};
  // addItemStayScan = () => {};
  // closeScan = () => {};
  // stayScan = () => {};

  render() {
    return (
      <div>
        <button
          className={
            this.state.scanning ? "btn btn-danger m-1" : "btn btn-success m-1"
          }
          onClick={this._scan}
        >
          {this.state.scanning ? "סיים סריקה" : "התחל סריקה"}
        </button>
        {this.state.scanning ? <Scanner onDetected={this._onDetected} /> : null}
        {/* {this.state.showPopup ? (
          <Popup
            showPopup={this.state.showPopup}
            togglePopup={this.togglePopup}
          />
        ) : null} */}
      </div>
    );
  }
}

const QuaggaC = withFirebase(QuaggaReact);
const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(QuaggaComp);
