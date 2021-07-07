import socket from "../WebSocket";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const rEmit = (event, payload) => {
  let message = {
    headers: {
      user_id: cookies.get("userId"),
      token: "Bearer " + cookies.get("SSID"),
    },
    payload: payload,
  };
  socket.emit(event, message);
};
