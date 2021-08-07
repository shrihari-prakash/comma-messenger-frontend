import React from "react";
import { useHistory } from "react-router-dom";
import Settings from "../components/Settings";
import { isLoggedIn } from "../utils/auth";
import routes from "../utils/routes";

const SettingsPage = () => {
  const history = useHistory();
  if (!isLoggedIn()) {
    history.push(routes.login);
  }

  return <Settings></Settings>;
};

export default SettingsPage;
