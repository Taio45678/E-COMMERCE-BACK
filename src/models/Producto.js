const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
 sequelize.define('producto', {
  idproducto: {  type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombreproducto: { type: DataTypes.STRING, allowNull: true, },
  descproducto: { type: DataTypes.STRING, allowNull: true, },
  precioproducto: { type: DataTypes.STRING, allowNull: true,  },
  disponibproducto: { type: DataTypes.STRING, allowNull: true,  },
  });
};