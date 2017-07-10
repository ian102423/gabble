const express = require("express");
const welcomeRouter = express.Router();
const models = require("../models");

welcomeRouter.get("/", function(req, res) {
  res.render("welcome");
});

module.exports = welcomeRouter;
