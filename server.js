// Express App
const express = require('express');
const app = express();
const path = require("path")

// CORS
const cors = require("cors");

// ENV Variables
const { MIDDLEWARE_PORT, SOCKET_PORT, CORS_ORIGIN } = require("./server/config");

// App Routes
const routes = require('./server/routes/routes');

// Socket
const sockets = require("./server/sockets/socket");

const { Server } = require("socket.io");
const http = require('http');
const server = http.createServer(app);
const io = new Server({
  server,
  cors: {
    origin: CORS_ORIGIN,
  }
});
io.listen(SOCKET_PORT);
        
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

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/build")));
  app.get("*", (req, res) => {
    res.sendFile();
  })
} else {
  app.get("/", (req, res) => {
    res.send("Running Successfully");
  });
};


app.listen(MIDDLEWARE_PORT, () => console.log("Server is up... on port " + MIDDLEWARE_PORT));