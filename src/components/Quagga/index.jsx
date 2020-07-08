import React, { Component } from "react";
import Scanner from "./Scanner";
import data from "../Data/items.json";
import { compose } from "recompose";
import { withAuthorization, withEmailVerification } from "../Session";
import { withFirebase } from "../Firebase";
import Quagga from "quagga";

//Quagga main button for scan
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
        {this.state.scanning ? (
          <Scanner onDetected={this._onDetected} scan={this._scan} />
        ) : null}
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
