import styled from "styled-components";
import Theme from "../../../styles/Theme";

export const AddFriendWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .footer {
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .ant-form-item-has-error .ant-input,
  .ant-form-item-has-error .ant-input-affix-wrapper,
  .ant-form-item-has-error .ant-input:hover,
  .ant-form-item-has-error .ant-input-affix-wrapper:hover {
    color: ${Theme.COLORS.ON_SURFACE};
    background-color: ${Theme.COLORS.SURFACE_LIGHTER};
  }

  .ant-form-item-explain-error, .error-text {
    color: ${Theme.COLORS.ON_BACKGROUND} !important;
    opacity: 0.7;
  }

  .ant-form {
    width: 100%;
  }

  .ant-form-item-has-error {
    background-color: ${Theme.COLORS.BACKGROUND} !important;
  }
`;
