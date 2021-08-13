import styled from "styled-components";
import Theme from "../../../styles/Theme";

export const FriendListWrapper = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 112px);
  background-color: ${Theme.COLORS.SURFACE};
  overflow-y: auto;

  .new-message-dot {
    margin-left: 8px;
  }

  .friend-name {
    display: flex;
    align-items: center;
  }

  .description {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .message-preview {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .time-from {
      float: right;
      white-space: nowrap;
      margin-left: 12px;
    }
  }

  /* width */
  ::-webkit-scrollbar {
    width: 6px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${Theme.COLORS.BACKGROUND};
    border-radius: 15px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${Theme.COLORS.BACKGROUND};
  }

  .loading-container {
    padding: 16px 0;
  }

  .ant-avatar {
    animation-name: avatarAppear;
    animation-duration: 0.3s;
    animation-timing-function: cubic-bezier(0.1, -0.6, 0.2, 0);
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
`;
