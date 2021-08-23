import styled from "styled-components";
import Theme from "../../../styles/Theme";

export const ActionButton = styled.button`
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: small;
  border: none;
  outline: none;
  cursor: pointer;
  color: ${Theme.COLORS.ON_SURFACE};
  background-color: ${Theme.COLORS.SURFACE_LIGHTER};
  border-radius: 100%;

  transition: all 0.3s ease-in-out;

  :hover {
    border-color: ${Theme.COLORS.ACCENT};
    border-right-width: 1px !important;
    outline: 0;
    -webkit-box-shadow: 0 0 0 2px ${Theme.COLORS.ACCENT}66;
    box-shadow: 0 0 0 2px ${Theme.COLORS.ACCENT}66;
  }

  :active {
    filter: brightness(1.2);
  }
`;
