import React from "react";
import { useHistory } from "react-router-dom";
import routes from "../../utils/routes";
import PageHeader from "../common/PageHeader";
import { ProfileWrapper } from "./styles";

export default function Profile() {
  const history = useHistory();
  const onBack = () => history.push(routes.settings);
  return (
    <ProfileWrapper>
      <PageHeader onBack={onBack}>
        Your Profile
        <div className="dummy"></div>
      </PageHeader>
    </ProfileWrapper>
  );
}
