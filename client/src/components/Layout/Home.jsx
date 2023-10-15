import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../../state/Socket/Socket"
import ScoreBoard from "./ScoreBoard/ScoreBoard";
import { UserContext } from "../../state/User/User";

const Home = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const socket = useContext(SocketContext);
  const { authorized, disconnectUser } = useContext(UserContext);

  useEffect(() => {
    if(authorized) {
      socket.connect();
    } else {
      disconnectUser();
      navigate("/login");
    };
  }, [authorized, location, navigate, socket, disconnectUser]);

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    authorized && 
      <ScoreBoard />
  );

};

export default Home;