const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
 sequelize.define('producto', {
  idprod: {  type: DataTypes.INTEGER, primaryKey: true, allowNull: false, },
  nombreprod: { type: DataTypes.STRING, allowNull: true, },
  descprod: { type: DataTypes.STRING, allowNull: true, },
  precioprod: { type: DataTypes.STRING, allowNull: true,  },
  disponib: { type: DataTypes.STRING, allowNull: true,  },
  });
};