import styled from "styled-components";
import Theme from "./styles/Theme";

export const NotificationWrapper = styled.div`
  .ant-notification-notice-message,
  .ant-notification-notice-description {
    color: ${Theme.COLORS.ON_BACKGROUND};
  }

  .ant-notification-notice-close .ant-notification-close-x {
    color: ${Theme.COLORS.ON_BACKGROUND};
  }

  .ant-notification-notice-content,
  .ant-notification-notice {
    background-color: ${Theme.COLORS.BACKGROUND};
    border-radius: 8px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .ant-notification-notice-content {
    width: 100%;
  }
`;
