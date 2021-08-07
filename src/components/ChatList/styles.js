import styled from "styled-components";
import Theme from "../../styles/Theme";

export const ChatListContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;

  .settings-fab {
    position: absolute;
    bottom: 32px;
    left: calc(50% - 30px);
    height: 60px;
    width: 60px;
    background-color: ${Theme.COLORS.BACKGROUND};
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 16px 0px rgba(0, 0, 0, 0.8);
    color: ${Theme.COLORS.ON_BACKGROUND};
    font-size: large;
    cursor: pointer;

    :hover {
      filter: brightness(1.3);
    }

    :active {
      filter: brightness(1.6);
    }
  }
`;
