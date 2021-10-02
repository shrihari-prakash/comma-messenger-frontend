import { ActionButton } from "../../common/ActionButton/styles";
import { ChatListHeading, HeaderContainer, Greeting } from "./styles";
import { PlusOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { getLoggedInUser } from "../../../utils/auth";

const Header = ({ showAddFriendModal, unreadCount }) => {
  const user = getLoggedInUser();

  return (
    <HeaderContainer>
      <Greeting>
        Hello, {user.name.givenName}{" "}
        <span role="img" aria-label="hello-emoji">
          👋
        </span>
      </Greeting>
      <ChatListHeading>
        Your chats {unreadCount > 0 && `(${unreadCount})`}
        <Tooltip title="Add Friend" placement="left" mouseEnterDelay={2}>
          <ActionButton onClick={showAddFriendModal}>
            <PlusOutlined />
          </ActionButton>
        </Tooltip>
      </ChatListHeading>
    </HeaderContainer>
  );
};

export default Header;
