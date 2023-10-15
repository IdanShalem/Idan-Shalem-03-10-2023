import React from "react";
import { io } from "socket.io-client";

const url = "https://idan-shalem-spinomenal-3d79fbd337f3.herokuapp.com:3002";

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
