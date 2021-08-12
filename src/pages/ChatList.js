import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import ChatList from "../components/ChatList";
import { isLoggedIn } from "../utils/auth";
import routes from "../utils/routes";

const ChatListPage = () => {
  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn()) history.push(routes.login);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn()) return null;

  return <ChatList></ChatList>;
};

export default ChatListPage;
