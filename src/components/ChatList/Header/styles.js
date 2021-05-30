import styled from "styled-components";
import Theme from "../../../styles/Theme";

export const HeaderContainer = styled.div`
  min-height: 112px;
  background-color: ${Theme.COLORS.BACKGROUND};
  color: ${Theme.COLORS.ON_BACKGROUND};
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
`;

export const ChatListHeading = styled.div`
  padding: 6px 16px;
  text-align: left;
  font-size: x-large;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Greeting = styled.div`
  padding: 6px 16px;
  text-align: left;
  font-size: normal;
  font-weight: bold;
  opacity: 0.5;
`;
