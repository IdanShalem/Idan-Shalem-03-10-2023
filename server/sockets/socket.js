const { polling_frequency } = require("../assets/db.json");
const { generateScore } = require("../utils/utils");

const use = io => {
  io.on("connection", socket => {
    console.log("user connected");

    let scoreInterval;
    scoreInterval = setInterval(() => {
      const score = generateScore();
      socket.emit("scoreUpdate", score);
    }, [polling_frequency]);

    socket.on("disconnect", () => {
      console.log("user disconnected");
      
      clearInterval(scoreInterval);
    });
  });
};

module.exports = { use };