const { approved_ids } = require("../assets/db.json");
const { generateScore } = require("../utils/utils");
const { AUTH_TOKEN } = require("../config");

const getUser = userId => {
  const users = approved_ids || [];
  const isAuthorized = users.includes(userId);
  if(isAuthorized){ 
    return {
      userId,
      AUTH_TOKEN
    };
  } else {
    throw new Error("Unauthorized User");
  };
};

const getScore = () => {
  try {
    return generateScore();
  } catch (err) {
    throw new Error("Something went wrong");
  };
};


module.exports = {
  getUser,
  getScore
};