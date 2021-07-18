import styled from "styled-components";
import Theme from "../../../styles/Theme";

export const ChatComposerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  textarea {
    margin-right: 12px;
    flex: 1;
    resize: vertical;
    max-height: 500px;
  }

  .anticon {
    color: ${Theme.COLORS.ON_SURFACE};
  }
`;
