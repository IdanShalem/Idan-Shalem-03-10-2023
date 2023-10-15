const { max_score, min_score } = require("../assets/db.json");

const generateScore = () => {
  if(max_score !== undefined && min_score !== undefined && max_score > min_score) {
    return Math.floor(Math.random() * (max_score - min_score) + min_score);
  } else {
    throw new Error("Something Went Wrong");
  };
};


module.exports = {
  generateScore
};
