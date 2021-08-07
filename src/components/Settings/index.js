import { LockOutlined, SkinOutlined, UserOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { getLoggedInUser } from "../../utils/auth";
import { StyledList } from "../common/List/styles";
import PageHeader from "../common/PageHeader";
import { SettingsWrapper } from "./styles";

const Settings = () => {
  const history = useHistory();
  const onBack = () => history.push("/conversations");
  const settingsList = [
    {
      id: 1,
      icon: <UserOutlined />,
      title: "My Profile",
      description:
        "Logged in as " +
        getLoggedInUser().name.givenName +
        " " +
        getLoggedInUser().name.familyName,
      action: () => null,
    },
    {
      id: 2,
      icon: <SkinOutlined />,
      title: "Themes",
      description: null,
      action: () => null,
    },
    {
      id: 3,
      icon: <LockOutlined />,
      title: "Privacy",
      description: null,
      action: () => null,
    },
  ];

  return (
    <SettingsWrapper>
      <PageHeader onBack={onBack}>
        Settings
        <div className="dummy"></div>
      </PageHeader>
      <StyledList
        dataSource={settingsList}
        renderItem={(setting) => (
          <StyledList.Item key={setting.id}>
            <StyledList.Item.Meta
              avatar={setting.icon}
              title={setting.title}
              description={setting.description}
            />
          </StyledList.Item>
        )}
      ></StyledList>
    </SettingsWrapper>
  );
};

export default Settings;
