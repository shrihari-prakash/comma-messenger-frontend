import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Profile from "../components/Profile";
import { isLoggedIn } from "../utils/auth";
import routes from "../utils/routes";

const ProfilePage = () => {
  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn()) history.push(routes.login);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn()) return null;

  return <Profile />;
};

export default ProfilePage;
