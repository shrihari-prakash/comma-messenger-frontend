import { Button } from "antd";
import styled from "styled-components";
import Theme from "../../../styles/Theme";

export const buttonStyle = `
border-radius: ${Theme.BUTTON.BORDER_RADIUS};
font-size: 12px;
font-weight: bold;
text-transform: uppercase;
/* font-style: italic; */
border: none;
outline: none;
cursor: pointer;
color: ${Theme.COLORS.ON_SURFACE};
background-color: ${Theme.COLORS.SURFACE_LIGHTER};
border: none;
display: flex;
align-items: center;
justify-content: center;

:hover {
  border-color: ${Theme.COLORS.ACCENT};
  color: ${Theme.COLORS.ON_SURFACE};
  background-color: ${Theme.COLORS.SURFACE_LIGHTER};
  outline: 0;
  -webkit-box-shadow: 0 0 0 2px ${Theme.COLORS.ACCENT}66;
  box-shadow: 0 0 0 2px ${Theme.COLORS.ACCENT}66;
}

:focus {
  background-color: ${Theme.COLORS.SURFACE_LIGHTER};
  color: ${Theme.COLORS.ON_SURFACE};
}

:active {
  filter: brightness(1.2);
  color: ${Theme.COLORS.ON_ACCENT};
  background-color: ${Theme.COLORS.SURFACE_LIGHTER};
}`;

export const StyledButton = styled(Button)`
  ${buttonStyle}
`;
