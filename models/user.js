"use strict";
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define(
    "user",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );

  user.associate = function(models) {
    user.hasMany(models.post, { as: "posts", foreignKey: "authorid" });
    user.hasMany(models.like, { as: "likes", foreignKey: "userid" });
  };
  return user;
};
