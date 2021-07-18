import styled from "styled-components";
import Theme from "../../../styles/Theme";

export const ConversationWrapper = styled.div`
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  word-spacing: 0px;
  padding-bottom: 8px;

  .loading-container {
    height: 52px;
  }

  .recipient-indicator {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    margin: 0 12px;
    padding: 4px 0;
    clear: both;

    .typing-container {
      display: inline-block;
      margin: 0 4px;
      position: relative;
    }

    .tiblock {
      align-items: center;
      display: flex;
      height: 17px;
    }

    .tidot {
      animation: mercuryTypingAnimation 1.5s infinite ease-in-out;
      border-radius: 2px;
      display: inline-block;
      height: 4px;
      margin-right: 2px;
      width: 4px;
      background-color: ${Theme.COLORS.ON_BACKGROUND};
    }

    @keyframes mercuryTypingAnimation {
      0% {
        -webkit-transform: translateY(0px);
      }
      28% {
        -webkit-transform: translateY(-5px);
      }
      44% {
        -webkit-transform: translateY(0px);
      }
    }

    .tidot:nth-child(1) {
      animation-delay: 200ms;
    }

    .tidot:nth-child(2) {
      animation-delay: 300ms;
    }

    .tidot:nth-child(3) {
      animation-delay: 400ms;
    }
  }

  .seen-avatar {
    animation: seenAppear 0.3s ease-in;

    @keyframes seenAppear {
      from {
        scale: 0.1;
        opacity: 0;
      }
      to {
        scale: 1;
        opacity: 1;
      }
    }
  }
`;

export const LoadMoreWrapper = styled.div`
  margin: 16px 0;
`;
