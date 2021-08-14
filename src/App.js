import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import ChatListPage from "./pages/ChatList";
import { PageWrapper } from "./components/common/PageWrapper/styles";
import SplitsPage from "./pages/Splits";
import LoginPage from "./pages/Login";
import React, { useEffect } from "react";
import { UserProvider } from "./contexts/UserContext";
import socket from "./WebSocket";
import { rEmit } from "./utils/socket";
import subscribeUser from "./subscription";
import routes from "./utils/routes";
import SettingsPage from "./pages/Settings";
import ProfilePage from "./pages/Profile";
import moment from "moment";
import { notification } from "antd";
import { NotificationWrapper } from "./AppStyles";

const routesList = [
  {
    id: "1",
    path: routes.conversations,
    name: "Conversations",
    Component: ChatListPage,
  },
  {
    id: "2",
    path: routes.conversations + "/:threadId",
    name: "Splits",
    Component: SplitsPage,
  },
  { id: "3", path: routes.settings, name: "Settings", Component: SettingsPage },
  { id: "4", path: routes.login, name: "Login", Component: LoginPage },
  { id: "5", path: routes.root, name: "Login", Component: LoginPage },
  { id: "6", path: routes.profile, name: "Profile", Component: ProfilePage },
];

function App() {
  const connectSocket = () => {
    console.log("connecting to realtime...");
    rEmit("_connect", {});
  };

  const openChatNotification = (message) => {
    if (window.location.href.includes(message.thread_id)) return;

    notification.open({
      message: (
        <>
          From&nbsp;
          <b>{message.username}</b>
        </>
      ),
      description: message.content || "Sent a message",
      key: message.thread_id,
      getContainer: () => document.getElementById("notification-container"),
    });
  };

  useEffect(() => {
    socket.on("connect", connectSocket);
    socket.on("reconnect", connectSocket);

    socket.on("_connect", () => {
      console.log("connected.");
      subscribeUser();
    });

    socket.on("_messageIn", openChatNotification);

    moment.updateLocale("en", {
      relativeTime: {
        future: "in %s",
        past: "%s ago",
        s: "now",
        ss: "%ds",
        m: "1m",
        mm: "%dm",
        h: "1h",
        hh: "%dh",
        d: "1d",
        dd: "%dd",
        w: "1w",
        ww: "%dw",
        M: "1mo",
        MM: "%dmo",
        y: "1y",
        yy: "%dy",
      },
    });
  }, []);

  return (
    <UserProvider>
      <Router>
        <>
          <div className="App">
            {routesList.map(({ id, path, Component }) => (
              <Route key={id} exact path={path}>
                {({ match }) => (
                  <CSSTransition
                    in={match != null}
                    timeout={300}
                    classNames="page"
                    unmountOnExit
                  >
                    <div className="page">
                      <PageWrapper>
                        <Component />
                      </PageWrapper>
                    </div>
                  </CSSTransition>
                )}
              </Route>
            ))}
          </div>
          <NotificationWrapper id="notification-container"></NotificationWrapper>
        </>
      </Router>
    </UserProvider>
  );
}

export default App;
