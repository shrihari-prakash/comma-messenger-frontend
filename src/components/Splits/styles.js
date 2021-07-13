import styled from "styled-components";
import Theme from "../../styles/Theme";

export const SplitsWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  .header,
  .footer {
    background: ${Theme.COLORS.BACKGROUND};
  }
  .content {
    position: relative;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    background: ${Theme.COLORS.BACKGROUND};
    color: ${Theme.COLORS.ON_BACKGROUND};

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

export const HeaderUserWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${Theme.COLORS.ON_BACKGROUND};

  .user-name {
    animation: appear 0.3s;
  }

  .ant-avatar {
    margin-right: 12px;
  }

  @keyframes appear {
    from {
      transform: scale(1.2) translateY(-100%);
      opacity: 0;
    }
    to {
      transform: scale(1) translateY(0);
      opacity: 1;
    }
  }
`;
