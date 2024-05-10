import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import "./css/main.css";
import "./css/main-mobile.css";
import "./css/type.css";
import "./css/type-mobile.css";
import "./css/themes/intercord-101.css";

const root = ReactDOM.createRoot(document.getElementById("mentat-site"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
