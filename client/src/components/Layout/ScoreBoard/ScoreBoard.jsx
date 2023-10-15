import { useCallback, useContext, useEffect, useState } from "react";
import { SocketContext } from "../../../state/Socket/Socket";
import { MessagingContext } from "../../../state/Messaging/Messaging";
import { fetchScoreManually } from "./scoreBoard.util";

let fetchInterval = null;

const ScoreBoard = () => {
  const [color, setColor] = useState("black");
  const [score, setScore] = useState(0);
  const [manualFetch, setManualFetch] = useState(false);
  const socket = useContext(SocketContext);
  const { showSnackBar, SnackbarTypes } = useContext(MessagingContext);

  const handleScoreUpdate = useCallback((liveScore) => {
    setTimeout(() => {
      setColor("black");
    }, [1000]);
    setColor(liveScore > score ? "green" : "red");
    setScore(liveScore);
  }, [score]);

  const handleSocketConnection = useCallback(state => {
    setManualFetch(state);
  }, []);

  useEffect(() => {
    if(manualFetch) {
      fetchInterval = setInterval(() => {
        fetchScoreManually()
          .then(res => handleScoreUpdate(res.data))
          .catch(err => showSnackBar(err, SnackbarTypes.ERROR_MESSAGE));
      }, [5000]);
    } else {
      clearInterval(fetchInterval);
      fetchInterval = null;
    };
  }, [manualFetch]);

  useEffect(() => {
    socket.on("scoreUpdate", handleScoreUpdate);

    socket.on("disconnect", () => handleSocketConnection(true));
    
    socket.io.on("reconnect", () => handleSocketConnection(false));
    
  }, [handleScoreUpdate, handleSocketConnection, socket]);

  useEffect(() => {
    return () => clearInterval(fetchInterval);
  }, []);

  return (
    <div 
      style={{ 
        fontSize: "72px",
        fontWeight: 700,
        textAlign: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      }}
    >
      <p>Live Score:</p>
      <span style={{ color: color }}>{score}</span>
    </div>
  );
};

export default ScoreBoard;