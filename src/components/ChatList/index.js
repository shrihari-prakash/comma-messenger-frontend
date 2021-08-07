import { SettingOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import routes from "../../utils/routes";
import AddFriend from "./AddFriend";
import FriendList from "./FriendList";
import Header from "./Header";
import { ChatListContainer } from "./styles";

const ChatList = () => {
  const history = useHistory();

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
      <div
        className="settings-fab"
        onClick={() => history.push(routes.settings)}
      >
        <SettingOutlined />
      </div>
      <AddFriend
        isAddFriendModalVisible={isAddFriendModalVisible}
        setIsAddFriendModalVisible={setIsAddFriendModalVisible}
      />
    </ChatListContainer>
  );
};

export default ChatList;
