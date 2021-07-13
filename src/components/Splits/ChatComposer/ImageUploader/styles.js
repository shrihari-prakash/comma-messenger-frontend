import styled from "styled-components";
import Theme from "../../../../styles/Theme";

export const UploadWrapper = styled.div`
  height: 100%;
  width: 100%;

  img {
    margin: 2px;
    border-radius: ${Theme.CONTAINER.BORDER_RADIUS};
  }

  .file-select {
    margin-top: 24px;
    cursor: pointer;
  }

  .thumb-grid {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
