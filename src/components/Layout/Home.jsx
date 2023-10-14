import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../../state/Socket/Socket"
import ScoreBoard from "./ScoreBoard/ScoreBoard";

const Home = () => {

  const [authorized, setAuthorized] = useState(false);
  let navigate = useNavigate();
  const location = useLocation();
  const socket = useContext(SocketContext);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const isAuthorized = query.has("AUTH_TOKEN");
    if(isAuthorized) {
      setAuthorized(true);
      socket.connect();
    } else {
      setAuthorized(false);
      navigate("/login");
    };
  }, [authorized, location, navigate, socket]);

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