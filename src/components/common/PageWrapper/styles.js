import styled from "styled-components";
import Theme from "../../../styles/Theme";

export const PageWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  background-color: ${Theme.COLORS.BACKGROUND};

  @media only screen and (min-width: 768px) {
    max-width: 450px;
    max-height: 90%;

    box-shadow: 0px 0px 13px 1px rgba(0, 0, 0, 0.3);
  }
`;
