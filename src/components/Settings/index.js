import { useHistory } from "react-router-dom";
import PageHeader from "../common/PageHeader";
import { SettingsWrapper } from "./styles";

const Settings = () => {
  const history = useHistory();
  const onBack = () => history.push("/conversations");
  return (
    <SettingsWrapper>
      <PageHeader onBack={onBack}>
        Settings
        <div className="dummy"></div>
      </PageHeader>
    </SettingsWrapper>
  );
};

export default Settings;
