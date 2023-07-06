const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {const Review = sequelize.define('review', {  description: {  type: DataTypes.STRING,   },
    rating: { type: DataTypes.INTEGER, defaultValue: 1, },
    productoId: { type: DataTypes.INTEGER, allowNull: true, },
    usuarioId: { type: DataTypes.INTEGER,  allowNull: true,  },    
  });
  return Review;
};