import { useContext } from "react";
import FriendList from "./FriendList";
import Header from "./Header";
import { ChatListContainer } from "./styles";

const ChatList = () => {
  return (
    <ChatListContainer>
      <Header></Header>
      <FriendList></FriendList>
    </ChatListContainer>
  );
};

export default ChatList;
