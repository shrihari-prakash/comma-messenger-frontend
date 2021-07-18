import { useState } from "react";
import Cookies from "universal-cookie";

export default function useLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cookies = new Cookies();

  if (cookies.get("SSID") && cookies.get("SSID").length >= 30)
    //If token stored in cookie is 30 or more characters, take user directly to app.
    return setIsLoggedIn(true);

  return isLoggedIn;
}
