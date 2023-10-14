const express = require('express')
const router = express.Router();
const controllers = require("../controllers/controllers");

router.get("/user/:userId", controllers.getUser);
router.get("/score", controllers.getScore);

module.exports = router;