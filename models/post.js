"use strict";
module.exports = function(sequelize, DataTypes) {
  var post = sequelize.define(
    "post",
    {
      body: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {}
  );
  post.associate = function(models) {
    post.belongsTo(models.user, { as: "author", foreignKey: "authorid" });
    post.hasMany(models.like, {
      as: "likes",
      foreignKey: { name: "postid" },
      onDelete: "cascade",
      hooks: "true"
    });
  };
  return post;
};
