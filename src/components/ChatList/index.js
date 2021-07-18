import { useState } from "react";
import AddFriend from "./AddFriend";
import FriendList from "./FriendList";
import Header from "./Header";
import { ChatListContainer } from "./styles";

const ChatList = () => {
  const [isAddFriendModalVisible, setIsAddFriendModalVisible] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const showAddFriendModal = () => {
    setIsAddFriendModalVisible(true);
  };

  return (
    <ChatListContainer>
      <Header
        showAddFriendModal={showAddFriendModal}
        unreadCount={unreadCount}
      ></Header>
      <FriendList setUnreadCount={setUnreadCount}></FriendList>
      <AddFriend
        isAddFriendModalVisible={isAddFriendModalVisible}
        setIsAddFriendModalVisible={setIsAddFriendModalVisible}
      />
    </ChatListContainer>
  );
};

export default ChatList;
