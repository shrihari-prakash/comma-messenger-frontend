import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Themes } from "../../styles/Theme";
import routes from "../../utils/routes";
import { StyledList } from "../common/List/styles";
import PageHeader from "../common/PageHeader";
import ChatPreview from "./ChatPreview";
import {
  ChooseThemeHeader,
  ThemeColorIcon,
  ThemeIconSet,
  ThemeListWrapper,
  ThemeSelectorWrapper,
} from "./styles";

export default function ThemeSelector() {
  const history = useHistory();

  const [themeList, setThemeList] = useState([]);
  const onBack = () => history.push(routes.settings);

  useEffect(() => {
    const list = Themes.map((t) => ({
      id: t.id,
      displayName: t.displayName,
      name: t.name,
      themeBaseType: t.themeBaseType,
      colors: t.themeVariables.COLORS,
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
      <ChooseThemeHeader>Choose a Theme</ChooseThemeHeader>
      <ThemeListWrapper>
        <StyledList
          dataSource={themeList}
          renderItem={(theme) => (
            <StyledList.Item key={theme.id} onClick={theme.action}>
              <StyledList.Item.Meta
                avatar={
                  <ThemeIconSet themeBaseType={theme.themeBaseType}>
                    <ThemeColorIcon color={theme.colors.ACCENT} />
                    <ThemeColorIcon color={theme.colors.BACKGROUND} />
                    <ThemeColorIcon color={theme.colors.SURFACE} />
                  </ThemeIconSet>
                }
                title={theme.displayName}
                description={
                  localStorage.getItem("comma_theme_preference") === theme.name
                    ? "Currently Applied"
                    : ""
                }
              />
            </StyledList.Item>
          )}
        />
      </ThemeListWrapper>
    </ThemeSelectorWrapper>
  );
}
