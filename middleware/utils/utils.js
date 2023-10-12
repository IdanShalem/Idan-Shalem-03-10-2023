const db = require("../assets/db.json");

const generateScore = () => Math.floor(Math.random() * (db.max_score - db.min_score) + db.min_score);


module.exports = {
  generateScore
};
