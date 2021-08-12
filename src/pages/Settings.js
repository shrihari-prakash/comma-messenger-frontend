import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Settings from "../components/Settings";
import { isLoggedIn } from "../utils/auth";
import routes from "../utils/routes";

const SettingsPage = () => {
  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn()) history.push(routes.login);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn()) return null;

  return <Settings></Settings>;
};

export default SettingsPage;
