import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Themes } from "../../styles/Theme";
import routes from "../../utils/routes";
import { StyledList } from "../common/List/styles";
import PageHeader from "../common/PageHeader";
import ChatPreview from "./ChatPreview";
import { ThemeSelectorWrapper } from "./styles";

export default function ThemeSelector() {
  const history = useHistory();

  const [themeList, setThemeList] = useState([]);
  const onBack = () => history.push(routes.settings);

  useEffect(() => {
    const list = Themes.map((t) => ({
      id: t.id,
      displayName: t.displayName,
      name: t.name,
      action: () => setTheme(t),
    }));
    setThemeList(list);
  }, []);

  const setTheme = (t) => {
    localStorage.setItem("comma_theme_preference", t.name);
    window.location.reload();
  };

  return (
    <ThemeSelectorWrapper>
      <PageHeader onBack={onBack}>
        Themes
        <div className="dummy"></div>
      </PageHeader>
      <ChatPreview />
      <StyledList
        dataSource={themeList}
        renderItem={(theme) => (
          <StyledList.Item key={theme.id} onClick={theme.action}>
            <StyledList.Item.Meta title={theme.displayName} />
          </StyledList.Item>
        )}
      />
    </ThemeSelectorWrapper>
  );
}
