import React, { Component } from "react";
import Quagga from "quagga";
import { confirmAlert } from "react-confirm-alert"; // Import

//set camera for scanning and return result if found or not
class Scanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 0,
    };
  }
  componentDidMount() {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          constraints: {
            width: 640,
            height: 480,
            facingMode: "environment", // or user
          },
        },
        locator: {
          patchSize: "medium",
          halfSample: true,
        },
        numOfWorkers: 4,
        decoder: {
          readers: ["ean_reader", "ean_8_reader"],
        },
        locate: true,
      },
      function (err) {
        if (err) {
          return console.log(err);
        }
        Quagga.start();
      }
    );
    Quagga.onDetected(this._onDetected);
    //set time out for scanning and close after 15 sec
    this.setState(() => {
      return {
        timer: setTimeout(() => {
          Quagga.stop();
          this._scan();
          confirmAlert({
            title: "סריקה נכשלה",
            message: "ייתכן והמוצר לא נמצא במאגר/שלא נסרק מוצר כ-15 שניות",
            buttons: [
              {
                label: "סגור",
                onClick: () => {},
              },
            ],
          });
        }, 15000),
      };
    });
  }

  componentWillUnmount() {
    Quagga.stop();
    clearTimeout(this.state.timer);
    this.setState(() => {
      return {
        timer: 0,
      };
    });
  }

  _scan = () => {
    this.props.scan();
  };
  _onDetected = (result) => {
    clearTimeout(this.state.timer);
    this.setState(() => {
      return {
        timer: 0,
      };
    });
    this.props.onDetected(result);
  };

  render() {
    return <div id="interactive" className="viewport" />;
  }
}

export default Scanner;
