import { StyledButton } from "../common/StyledButton/styles";
import LoginBg from "./assets/login_bg.svg";
import GoogleIcon from "./assets/G_icon.svg";
import { LoginWrapper } from "./styles";
import { useHistory } from "react-router";
import Cookies from "universal-cookie";
import { useEffect } from "react";
import { isLoggedIn } from "../../utils/auth";
import { apiBasePath, serverUrl } from "../../utils/url";
import routes from "../../utils/routes";

const Login = () => {
  const history = useHistory();
  const cookies = new Cookies();

  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);
  //API reponse parameters
  const status = params.get("status");
  const userData = JSON.parse(params.get("user_data"));
  const token = params.get("token");

  const redirectToGoogle = () => {
    /*  window.location.href = "http://localhost:26398/api/rest/v1/auth/google"; */
    window.location.href = `${serverUrl}${apiBasePath}/auth/google`;
  };

  const redirectToConversations = () => history.push(routes.conversations);

  const loginSuccess = () => {
    setAuthCookies(token, userData);
    return history.push(routes.conversations);
  };

  const setAuthCookies = (token, user) => {
    let now = new Date();
    let expiry = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    let options = {
      path: "/",
      expires: expiry,
    };

    cookies.set("SSID", token, options);
    cookies.set("userId", user._id, options);
    cookies.set("userEmail", user.email, options);
    cookies.set("userGivenName", user.name.givenName, options);
    cookies.set("userFamilyName", user.name.familyName, options);
    cookies.set("userDisplayPicture", user.display_picture, options);
  };

  useEffect(() => {
    if (status === "SUCCESS") return loginSuccess();

    if (isLoggedIn()) {
      return redirectToConversations();
    } else {
      cookies.remove("SSID");
      cookies.remove("userId");
      cookies.remove("userEmail");
      cookies.remove("userGivenName");
      cookies.remove("userFamilyName");
      cookies.remove("userDisplayPicture");

      history.push(routes.root);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* If the URL has a success status, it means user has already clicked the Sign In button and backend has
  returned the control to the same page.  */
  if (status === "SUCCESS") return <div></div>;

  //If there is no status
  if (isLoggedIn()) return <div></div>;

  //If there is no token present, it implies that the user is logged out or never logged in.
  return (
    <LoginWrapper>
      <div className="bg-overlay"></div>
      <img alt="Comma Messenger" className="app-logo" src={LoginBg}></img>
      <div className="app-name">
        comma <span className="white">messenger</span>
      </div>
      <div className="app-quote">'cause there's always something to say,</div>
      <StyledButton className="login-button" onClick={redirectToGoogle}>
        <img
          alt="Sign in with Google"
          className="g-icon"
          src={GoogleIcon}
        ></img>
        SIGN IN
      </StyledButton>
    </LoginWrapper>
  );
};

export default Login;
