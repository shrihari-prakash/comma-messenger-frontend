import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { serverUrl } from "./utils/url";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import Cookies from "universal-cookie";

const cookies = new Cookies();

/* axios.defaults.baseURL = "http://localhost:26398/api/"; */
axios.defaults.baseURL = `${serverUrl}/api/`;

//On success of any API request, increase token validity by one day, because that's what the backend does too.
//This is done so that as long as the user is active, they are never logged out.
axios.interceptors.response.use(
  function (response) {
    if (response.status === 200) {
      const now = new Date();
      const expiry = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      const options = { path: "/", expires: expiry };

      const currentSSID = cookies.get("SSID");
      const currentUserId = cookies.get("userId");
      const currentUserEmail = cookies.get("userEmail");
      const currentUserGivenName = cookies.get("userGivenName");
      const currentUserFamilyName = cookies.get("userFamilyName");
      const currentUserDisplayPicture = cookies.get("userDisplayPicture");

      cookies.set("SSID", currentSSID, options);
      cookies.set("userId", currentUserId, options);
      cookies.set("userEmail", currentUserEmail, options);
      cookies.set("userGivenName", currentUserGivenName, options);
      cookies.set("userFamilyName", currentUserFamilyName, options);
      cookies.set("userDisplayPicture", currentUserDisplayPicture, options);
      console.log("token validity extended.");
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
