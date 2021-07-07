import io from "socket.io-client";
import { serverUrl } from "./utils/url";

const socket = io(serverUrl, {
  path: "/api/socket/communicate",
  transports: ["websocket"],
});

export default socket;
