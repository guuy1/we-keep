import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import * as serviceWorker from "./serviceWorker";

import App from "./copms/App/App";

ReactDOM.render( < App / > , document.getElementById("root"));

serviceWorker.unregister();