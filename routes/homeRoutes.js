const express = require("express");
const homeRouter = express.Router();
const models = require("../models");

function checkAuth(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/auth/login");
  } else {
    return next();
  }
}
homeRouter.get("/", checkAuth, function(req, res) {
  models.post
    .findAll({
      include: [
        { model: models.user, as: "author" },
        {
          model: models.like,
          as: "likes",
          include: [{ model: models.user, as: "user" }]
        }
      ],
      order: [["updatedAt", "DESC"]]
    })
    .then(function(foundPosts) {
      foundPosts.map((e, i, a) => {
        if (e.authorid == req.session.user.id) {
          e.delete = true;
        }
        return e;
      });
      res.render("homepage", { gabs: foundPosts });
    });
});
homeRouter.post("/delete/:id/:authorid", (req, res) => {
  if (req.params.authorid == req.session.user.id) {
    models.post
      .find({
        where: {
          id: req.params.id
        }
      })
      .then(post => {
        return post.destroy();
      })
      .then(task => {
        return res.redirect("/");
      });
  } else {
    return res.redirect("/");
  }
});

module.exports = homeRouter;
