import React from "react";
import { useHistory } from "react-router-dom";
import ChatList from "../components/ChatList";
import { isLoggedIn } from "../utils/auth";
import routes from "../utils/routes";

const ChatListPage = () => {
  const history = useHistory();
  if (!isLoggedIn()) {
    history.push(routes.login);
  }

  return <ChatList></ChatList>;
};

export default ChatListPage;
