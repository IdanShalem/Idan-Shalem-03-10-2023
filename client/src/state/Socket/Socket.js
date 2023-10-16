import React from "react";
import { io } from "socket.io-client";

const url = "http://localhost:5000";

const socket = io(url, {
  withCredentials: true,
  secure: true,
  transports: ['websocket'],
  autoConnect: false
});

export const SocketContext = React.createContext();

export const SocketProvider = props => {

  return <SocketContext.Provider value={socket}>{props.children}</SocketContext.Provider>;
};
