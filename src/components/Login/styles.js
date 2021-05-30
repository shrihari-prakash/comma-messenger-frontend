import styled from "styled-components";
import Theme from "../../styles/Theme";

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 64px 0;

  /* top, transparent black, faked with gradient */
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    /* bottom, image */
      url("https://images.unsplash.com/photo-1558339693-4b3b69d80001?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1053&q=80");
  background-position: center;
  background-size: cover;

  .app-logo {
    width: 200px;
    height: auto;
    user-select: none;
    animation: appear 1.5s;
  }

  .app-name {
    font-size: xx-large;
    font-weight: bold;
    color: ${Theme.COLORS.ACCENT};
    user-select: none;
    filter: brightness(1.5);
    animation: appear 1.5s;

    .white {
      color: ${Theme.COLORS.ON_ACCENT};
      opacity: 0.8;
    }
  }

  .app-quote {
    font-size: small;
    font-weight: lighter;
    color: ${Theme.COLORS.ON_BACKGROUND};
    user-select: none;
    animation: appear 1.5s;
  }

  .login-button {
    margin: 64px 0;
    padding: 22px;
    font-weight: bold;
    animation: fadeZoom 1s;

    .g-icon {
      width: 18px;
      height: auto;
      margin-right: 12px;
    }
  }

  @keyframes appear {
    from {
      opacity: 0;
      transform: translateY(-10%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeZoom {
    from {
      opacity: 0;
      transform: scale(0.7);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
