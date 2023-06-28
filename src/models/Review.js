const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Review', {
      description: {
        type: DataTypes.STRING,
      },
      rating: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
    });
  };