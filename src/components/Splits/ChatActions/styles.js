import styled from "styled-components";
import Theme from "../../../styles/Theme";

export const ChatActionsWrapper = styled.div`
  background-color: ${Theme.COLORS.SURFACE};
  padding: 14px 8px;
  animation-name: chatActionsAppear;
  animation-duration: 0.5s;

  @keyframes chatActionsAppear {
    from {
      opacity: 0;
      transform: translateY(20%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
