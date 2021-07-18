import { List } from "antd";
import styled from "styled-components";
import Theme from "../../../styles/Theme";

export const StyledList = styled(List)`
  * {
    color: ${Theme.COLORS.ON_BACKGROUND};
  }

  .ant-list-item {
    border-bottom: none;
    padding: 16px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    border-radius: ${Theme.LIST.BORDER_RADIUS};
    margin: 4px 8px;
    user-select: none;

    :hover {
      background-color: ${Theme.COLORS.ON_BACKGROUND}0D;
      transition: all 0.2s ease-in-out;
    }

    :active {
      background-color: ${Theme.COLORS.ON_BACKGROUND}1D;
      transition: all 0.1s ease-in-out;
    }
  }

  .ant-list-item-meta-title,
  .ant-list-item-meta-description {
    text-align: left;
  }

  .ant-list-item-meta-description {
    opacity: 0.5;
    font-size: small;
  }
`;
