import {
  LockOutlined,
  LogoutOutlined,
  SkinOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { getLoggedInUser } from "../../utils/auth";
import routes from "../../utils/routes";
import { StyledList } from "../common/List/styles";
import PageHeader from "../common/PageHeader";
import { SettingsWrapper } from "./styles";
import Cookies from "universal-cookie";

const Settings = () => {
  const history = useHistory();
  const cookies = new Cookies();

  const onBack = () => history.push(routes.conversations);
  const navigateProfile = () => history.push(routes.profile);
  const navigateThemes = () => history.push(routes.themes);
  const logout = () => {
    const cookieList = [
      "SSID",
      "userId",
      "userEmail",
      "userGivenName",
      "userFamilyName",
      "userDisplayPicture",
    ];

    cookieList.forEach((c) => cookies.remove(c));
    history.push(routes.login);
  };

  const settingsList = [
    {
      id: 1,
      icon: <UserOutlined />,
      title: "My Profile",
      description: `Logged in as ${getLoggedInUser().name.givenName} ${
        getLoggedInUser().name.familyName
      }`,
      action: navigateProfile,
    },
    {
      id: 2,
      icon: <SkinOutlined />,
      title: "Themes",
      description: null,
      action: navigateThemes,
    },
    /* {
      id: 3,
      icon: <LockOutlined />,
      title: "Privacy",
      description: null,
      action: () => null,
    }, */
    {
      id: 4,
      icon: <LogoutOutlined />,
      title: "Logout",
      description: null,
      action: logout,
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
          <StyledList.Item key={setting.id} onClick={setting.action}>
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
