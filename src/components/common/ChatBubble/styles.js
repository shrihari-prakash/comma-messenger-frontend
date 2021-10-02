import styled from "styled-components";
import Theme from "../../../styles/Theme";

const R = "25px";
const r = "2px";

export const ChatBubbleWrapper = styled.div`
  width: 100%;
  clear: both;
  position: relative;
  opacity: ${(p) => (p.dimmed ? "0.5" : "1")};
  transition: opacity 0.5s ease-in-out;
  user-select: none;

  padding: ${(p) => {
    switch (p.position) {
      case "first":
        return "12px 8px 0px";
      case "last":
        return "0px 8px 2px";
      case "middle":
        return "0px 8px 0px";
      case "only":
      default:
        return "12px 8px 2px";
    }
  }};

  .ant-image-img {
    object-fit: cover;
  }

  .avatar {
    float: left;
    margin: 4px 6px;
    animation-name: avatarAppear;
    animation-duration: 0.5s;
  }

  @keyframes avatarAppear {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .additional-margin {
    float: left;
    width: 44px;
    height: 44px;
  }

  .timestamp {
    float: ${(p) => (p.type === "mine" ? "right" : "left")};
    clear: both;
    font-size: x-small;
    opacity: 0.5;
    animation-name: timestampAppear;
    animation-duration: 0.3s;
    animation-timing-function: ease-in-out;

    .additional-margin {
      height: 1px;
    }
  }

  .message-actions {
    float: ${(p) => (p.type === "mine" ? "right" : "left")};
    clear: both;
    font-size: small;
    opacity: 0.8;
    display: flex;
    animation-name: timestampAppear;
    animation-duration: 0.3s;
    animation-timing-function: ease-in-out;

    .additional-margin {
      height: 1px;
    }

    .action-button {
      cursor: pointer;
      font-size: large;
      margin: 0 4px;
    }

    .disabled {
      display: none;
      opacity: 0.6;
      cursor: not-allowed;
    }

    .active {
      color: ${Theme.COLORS.ACCENT};
    }
  }

  @keyframes timestampAppear {
    from {
      opacity: 0;
      transform: translateY(-50%);
    }
    to {
      opacity: 0.5;
      transform: translateY(0);
    }
  }

  .bubble-wrap {
    .liked-avatar {
      position: relative;
      font-size: x-small;
      position: absolute;
      height: 18px;
      width: 22px;
      border-radius: 15px;
      right: -6px;
      bottom: -6px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${Theme.COLORS.ON_BACKGROUND};
      background-color: ${Theme.COLORS.ACCENT};
      border: 2px solid ${Theme.COLORS.BACKGROUND};
      z-index: 1;
      animation-name: avatarAppear;
      animation-duration: 0.2s;
    }
  }

  .bubble {
    margin: 1px 0;
    max-width: 80%;
    border-radius: 25px;
    font-size: ${(p) => p.textSize};
    text-align: left;
    word-break: break-word;
    cursor: default;
    position: relative;
    background-color: ${(p) => {
      if (p.ghost === true) return "transparent";
      return p.type === "mine"
        ? Theme.COLORS.ACCENT
        : Theme.COLORS.RECEIVE_BUBBLE;
    }};
    float: ${(p) => (p.type === "mine" ? "right" : "left")};
    padding: ${(p) => (p.tight === false ? "10px" : "0")};
    overflow: ${(p) => (p.hideOverflow ? "hidden" : "initial")};
    color: ${(p) =>
      p.type === "mine" ? Theme.COLORS.ON_ACCENT : Theme.COLORS.ON_BACKGROUND};
    animation: ${(p) =>
      p.shouldAnimate && !p.dimmed ? "popOut 0.3s ease-in-out 1" : "none"};

    @keyframes popOut {
      50% {
        transform: scale(1.1);
      }
    }

    .ant-image-img {
      object-fit: cover;
    }

    .ant-image {
      display: block;
    }

    .img-loader {
      height: 200px;
      width: 200px;
      display: flex;
      align-items: center;
      justify-content: center;

      .ant-spin {
        color: ${(p) =>
          p.type === "mine"
            ? Theme.COLORS.ON_ACCENT
            : Theme.COLORS.ON_BACKGROUND};
      }
    }

    @media only screen and (min-width: 768px) {
      margin: 2px 0;
    }

    border-radius: ${(p) => {
      if (p.type === "mine") {
        switch (p.position) {
          case "first":
            return `${R} ${R} ${r} ${R}`;
          case "last":
            return `${R} ${r} ${R} ${R}`;
          case "middle":
            return `${R} ${r} ${r} ${R}`;
          case "only":
          default:
            return R;
        }
      } else {
        switch (p.position) {
          case "first":
            return `${R} ${R} ${R} ${r}`;
          case "last":
            return `${r} ${R} ${R} ${R}`;
          case "middle":
            return `${r} ${R} ${R} ${r}`;
          case "only":
          default:
            return R;
        }
      }
    }};

    :hover {
      filter: brightness(1.2);
    }
  }
`;
