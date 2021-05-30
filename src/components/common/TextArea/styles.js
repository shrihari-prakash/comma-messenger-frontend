import { Input } from "antd";
import styled from "styled-components";
import Theme from "../../../styles/Theme";

const { TextArea } = Input;

export const StyledTextArea = styled(TextArea)`
  border-radius: 20px;
  border: none;
  color: ${Theme.COLORS.ON_SURFACE};
  background-color: ${Theme.COLORS.SURFACE_LIGHTER};
  font-size: 14px;

  @media only screen and (min-width: 768px) {
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
      background: ${Theme.COLORS.SURFACE};
      border-radius: 15px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: ${Theme.COLORS.SURFACE};
    }
  }
`;
