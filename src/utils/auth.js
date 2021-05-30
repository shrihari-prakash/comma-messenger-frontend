import axios from "axios";
import Cookies from "universal-cookie";

export const isLoggedIn = () => {
  let loggedIn = false;
  const cookies = new Cookies();

  if (cookies.get("SSID") && cookies.get("SSID").length >= 30)
    //If token stored in cookie is 30 or more characters, user is logged in.
    loggedIn = true;

  if (loggedIn === true) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + cookies.get("SSID");
    axios.defaults.headers.common["x-cm-user-id"] = cookies.get("userId");
  }

  return loggedIn;
};

export const getLoggedInUser = () => {
  const cookies = new Cookies();

  const user = {
    _id: cookies.get("userId"),
    name: {
      givenName: cookies.get("userGivenName"),
      familyName: cookies.get("userFamilyName"),
    },
    email: cookies.get("userEmail"),
    display_picture: cookies.get("userDisplayPicture"),
  };

  return user;
};
