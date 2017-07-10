const express = require("express");
const gabRouter = express.Router();
const models = require("../models");

gabRouter.get("/gab", function(req, res) {
  res.render("newGab");
});
gabRouter.post("/gab", function(req, res) {
  var newGab = models.post.build({
    body: req.body.body,
    authorid: req.session.user.id
  });
  newGab
    .save()
    .then(function(savedGab) {
      console.log("savedGab: ", savedGab);
    })
    .catch(function(err) {
      console.warn("Error ", err);
    });
  return res.redirect("/");
});

module.exports = gabRouter;
