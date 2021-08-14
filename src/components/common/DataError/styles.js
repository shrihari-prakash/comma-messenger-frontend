import styled from "styled-components";
import Theme from "../../../styles/Theme";

export const DataErrorWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 24px;
  color: ${Theme.COLORS.ON_SURFACE};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0.8;

  .anticon {
    font-size: large;
  }

  .refresh-button {
    margin: 24px 0;

    .ant-btn {
      background-color: ${Theme.COLORS.ACCENT};
      color: ${Theme.COLORS.ON_ACCENT};
      border: none;
      box-shadow: 0 0 16px 0px rgb(0 0 0 / 40%);
      border-radius: ${Theme.BUTTON.BORDER_RADIUS};
    }
  }
`;
