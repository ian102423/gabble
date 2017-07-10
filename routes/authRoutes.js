const express = require("express");
const authRouter = express.Router();
const models = require("../models");

authRouter.get("/login", function(req, res) {
  res.render("login");
});

authRouter.post("/login", function(req, res) {
  if (!req.body || !req.body.username || !req.body.password) {
    return res.redirect("/login");
  }
  var userRecord = req.body;
  models.user
    .find({
      where: { username: req.body.username }
    })
    .then(function(foundUser) {
      console.log("foundUser: ", foundUser);
      if (!foundUser) {
        return res.redirect("/auth/login");
      }

      if (req.body.password === foundUser.password) {
        req.session.user = foundUser;
        return res.redirect("/");
      } else {
        return res.redirect("/auth/login");
      }
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
});
authRouter.post("/signup", function(req, res) {
  var newUser = models.user
    .build({
      username: req.body.username,
      password: req.body.password
    })
    .save()
    .then(function(savedUser) {})
    .catch(function(err) {
      console.warn("ERROR ", err);
    });
  return res.redirect("/auth/login");
});

authRouter.get("/signup", function(req, res) {
  res.render("signup");
});

module.exports = authRouter;
