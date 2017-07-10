"use strict";

module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.addConstraint("posts", ["authorid"], {
      type: "FOREIGN KEY",
      references: {
        table: "users",
        field: "id"
      },
      name: "adding_authorid"
    });
  },

  down: function(queryInterface, Sequelize) {
    queryInterface.removeConstraint("posts", "adding_authorid");
  }
};
