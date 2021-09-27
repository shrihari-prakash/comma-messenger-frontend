import styled from "styled-components";
import Theme from "../../styles/Theme";

export const ThemeSelectorWrapper = styled.div`
  height: 100%;
  width: 100%;
  backdrop-filter: brightness(1.3);
`;

export const ThemeIconSet = styled.div`
  display: flex;
  border-radius: ${Theme.CONTAINER.BORDER_RADIUS};
  background-color: ${Theme.COLORS.SURFACE};
  padding: 12px 4px;
`;

export const ThemeColorIcon = styled.div`
  width: 16px;
  height: 16px;
  margin: 0 2px;
  border-radius: 100%;
  background-color: ${(p) => p.color};
`;

export const ChooseThemeHeader = styled.div`
  padding: 12px 0;
  color: ${Theme.COLORS.ON_BACKGROUND};
  font-weight: bold;
`;
