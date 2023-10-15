// Express App
const express = require('express');
const app = express();
const path = require("path")

// CORS
const cors = require("cors");

// ENV Variables
const { MIDDLEWARE_PORT, SOCKET_PORT, CORS_ORIGIN } = require("./config");

// App Routes
const routes = require('./routes/routes');

// Socket
const sockets = require("./sockets/socket");

const server = app.listen(MIDDLEWARE_PORT, () => console.log("Server is up... on port " + MIDDLEWARE_PORT));

const socket = require("socket.io");

const io = socket(server, {
  pingTimeOut: 60000,
  cors: {
    origin: CORS_ORIGIN,
  }
});
        
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    credentials: true,
    origin: CORS_ORIGIN,
  })
);

//Websocket
sockets.use(io);

app.use('/', routes);

const __dirname1 = path.resolve();

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"));
  })
} else {
  app.get("/", (req, res) => {
    res.send("Running Successfully");
  });
};


