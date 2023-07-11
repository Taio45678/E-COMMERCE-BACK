const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {const Review = sequelize.define('review', {  
    description: {  type: DataTypes.STRING, allowNull: true },
    rating: { type: DataTypes.INTEGER, defaultValue: 1, allowNull: true },

    productoId: { type: DataTypes.INTEGER, allowNull: true, },
    usuarioId: { type: DataTypes.INTEGER,  allowNull: true,  }  
  },{
    indexes:[{
      unique: true,
      fields: ['usuarioId', 'productoId'],
      name: 'unique_usuario_producto'
    }]
  }
  );
  return Review;
};