import { ActionButton } from "../../common/ActionButton/styles";
import { ChatListHeading, HeaderContainer, Greeting } from "./styles";
import { PlusOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { getLoggedInUser } from "../../../utils/auth";

const Header = () => {
  const user = getLoggedInUser();
  
  return (
    <HeaderContainer>
      <Greeting>Hello, {user.name.givenName}</Greeting>
      <ChatListHeading>
        Your chats (2)
        <Tooltip title="Add Friend" placement="left" mouseEnterDelay={2}>
          <ActionButton>
            <PlusOutlined />
          </ActionButton>
        </Tooltip>
      </ChatListHeading>
    </HeaderContainer>
  );
};

export default Header;
