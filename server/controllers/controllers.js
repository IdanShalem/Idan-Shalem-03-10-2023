const services = require("../services/services");

const getUser = (req, res) => {
  try {
    const userId = req.params.userId;
    const user = services.getUser(userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err.message);
  };
};

const getScore = (req, res) => {
  try {
    const score = services.getScore();
    res.status(200).json(score);
  } catch (err) {
    res.status(400).json(err.message);
  };
};

module.exports = {
  getUser,
  getScore
}