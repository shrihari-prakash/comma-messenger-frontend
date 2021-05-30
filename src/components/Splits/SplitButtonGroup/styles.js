import styled from "styled-components";
import Theme from "../../../styles/Theme";

export const ButtonGroupWrapper = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  min-height: 28px;

  .ant-skeleton-button {
    margin: 0 4px;
    height: 28px;
    opacity: 0.5;
  }
`;

export const TabButton = styled.span`
  color: ${Theme.COLORS.ON_SURFACE};
  margin: 0 4px;
  padding: 4px 12px;
  font-weight: bold;
  font-size: small;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  box-shadow: ${(props) =>
    props.active ? "0px 0px 13px 1px rgba(0, 0, 0, 0.20)" : "none"};
  background-color: ${(props) =>
    props.active ? Theme.COLORS.SURFACE_LIGHTER : "transparent"};
`;
