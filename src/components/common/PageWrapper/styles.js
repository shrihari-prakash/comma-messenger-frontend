import styled from "styled-components";
import Theme from "../../../styles/Theme";

export const PageWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;

  @media only screen and (min-width: 768px) {
    max-width: 450px;
    max-height: 90%;

    box-shadow: 0px 0px 13px 1px rgba(0, 0, 0, 0.3);
  }

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
