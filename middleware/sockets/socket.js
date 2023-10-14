const { polling_frequency } = require("../assets/db.json");
const { generateScore } = require("../utils/utils");

const use = io => {
  io.on("connection", socket => {
    console.log("user connected");

    let scoreInterval;
    scoreInterval = setInterval(() => {
      const score = generateScore();
      console.log('score:', score)
      socket.emit("scoreUpdate", score);
    }, [polling_frequency]);

    socket.on("disconnect", () => {
      console.log("user disconnected");
      
      clearInterval(scoreInterval);
    });

    setTimeout(() => {
      socket.disconnect(true);
    }, [7500]);
  });
};

module.exports = { use };