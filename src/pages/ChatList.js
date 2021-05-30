import React from "react";
import ChatList from "../components/ChatList";
import { isLoggedIn } from "../utils/auth";

const ChatListPage = () => {
  isLoggedIn();

  return <ChatList></ChatList>;
};

export default ChatListPage;
