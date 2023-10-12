const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  MIDDLEWARE_PORT: process.env.MIDDLEWARE_PORT,
  SOCKET_PORT: process.env.SOCKET_PORT,
  CORS_ORIGIN: process.env.CORS_ORIGIN
};