import styled from "styled-components";
import Theme from "../../../styles/Theme";

export const HeaderWrapper = styled.div`
  height: 64px;
  animation-name: headerAppear;
  animation-duration: 0.5s;
  background-color: ${Theme.COLORS.BACKGROUND};

  @keyframes headerAppear {
    from {
      opacity: 0;
      transform: translateY(-10%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const HeaderSubWrapper = styled.div`
  width: calc(100% - 16px);
  height: 100%;
  margin: 0 8px;
  padding: 0 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${Theme.COLORS.SURFACE_LIGHTER};
  color: ${Theme.COLORS.ON_BACKGROUND};
  font-weight: bold;

  .dummy {
    width: 34px;
    height: 34px;
  }
`;
