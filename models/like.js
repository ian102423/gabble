"use strict";
module.exports = function(sequelize, DataTypes) {
  var like = sequelize.define("like", {}, {});

  like.associate = function(models) {
    like.belongsTo(models.user, { as: "user", foreignKey: "userid" });
    like.belongsTo(models.post, { as: "post", foreignKey: "postid" });
  };
  return like;
};
