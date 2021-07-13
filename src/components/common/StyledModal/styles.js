import { Modal } from "antd";
import styled from "styled-components";
import Theme from "../../../styles/Theme";
import { buttonStyle } from "../StyledButton/styles";

export const StyledModal = styled(Modal)`
  color: ${Theme.COLORS.ON_BACKGROUND};
  border-radius: ${Theme.CONTAINER.BORDER_RADIUS};
  overflow: hidden;

  .ant-modal-close-x {
    color: ${Theme.COLORS.ON_BACKGROUND};
  }

  .ant-modal-content {
    border-radius: ${Theme.CONTAINER.BORDER_RADIUS};
    overflow: hidden;
    background-color: ${Theme.COLORS.BACKGROUND};
  }

  .ant-modal-header {
    border: none;
    .ant-modal-title {
      color: ${Theme.COLORS.ON_BACKGROUND};
      font-size: large;
      font-weight: 900;
      font-style: italic;
    }
    background-color: ${Theme.COLORS.BACKGROUND};
  }

  .ant-modal-body,
  .ant-modal-footer {
    border: none;
    background-color: ${Theme.COLORS.BACKGROUND};
  }

  .ant-modal-footer {
    display: flex;
    justify-content: flex-end;
  }

  .ant-btn {
    width: 100px;
    ${buttonStyle}
  }
`;
