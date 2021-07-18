import io from "socket.io-client";
import { serverUrl } from "./utils/url";

const socket = io(serverUrl, {
  path: "/api/socket/communicate",
  transports: ["websocket", "polling"], // use WebSocket first, if available
});

socket.on("connect_error", () => {
  // revert to classic upgrade
  socket.io.opts.transports = ["polling", "websocket"];
});

export default socket;
