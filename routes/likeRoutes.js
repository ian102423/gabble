const express = require("express");
const likeRouter = express.Router();
const models = require("../models");

likeRouter.post("/:id", function(req, res) {
  var newLike = models.like
    .build({
      userid: req.session.user.id,
      postid: req.params.id
    })
    .save()
    .then(function(savedLike) {})
    .catch(function(err) {
      console.warn("Error ", err);
    });
  return res.redirect("/");
});

module.exports = likeRouter;
