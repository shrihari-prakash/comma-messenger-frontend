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

const routesList = [
  {
    path: routes.conversations,
    name: "Conversations",
    Component: ChatListPage,
  },
  {
    path: routes.conversations + "/:threadId",
    name: "Splits",
    Component: SplitsPage,
  },
  { path: routes.settings, name: "Settings", Component: SettingsPage },
  { path: routes.login, name: "Login", Component: LoginPage },
  { path: routes.root, name: "Login", Component: LoginPage },
];

function App() {
  const connectSocket = () => {
    console.log("connecting to realtime...");
    rEmit("_connect", {});
  };

  useEffect(() => {
    socket.on("connect", connectSocket);
    socket.on("reconnect", connectSocket);

    socket.on("_connect", () => {
      console.log("connected.");
      subscribeUser();
    });
  }, []);

  return (
    <UserProvider>
      <Router>
        <>
          <div className="App">
            {routesList.map(({ path, Component }) => (
              <Route key={path} exact path={path}>
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
        </>
      </Router>
    </UserProvider>
  );
}

export default App;
