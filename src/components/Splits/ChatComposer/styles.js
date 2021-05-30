import styled from "styled-components";

export const ChatComposerWrapper = styled.div`
  margin-top: 12px;
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
`;
