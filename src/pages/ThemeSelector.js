import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import ThemeSelector from "../components/Themes";
import { isLoggedIn } from "../utils/auth";
import routes from "../utils/routes";

export default function ThemeSelectorPage() {
  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn()) history.push(routes.login);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn()) return null;

  return <ThemeSelector></ThemeSelector>;
}
