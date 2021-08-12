import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Splits from "../components/Splits";
import { isLoggedIn } from "../utils/auth";
import routes from "../utils/routes";

export default function SplitsPage() {
  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn()) history.push(routes.login);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn()) return null;

  return <Splits></Splits>;
}
