const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const User = sequelize.define('carrocompra', {
    idcarrocompra: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    idusuario: { type: DataTypes.INTEGER, allowNull: true },
    idproducto: { type: DataTypes.INTEGER, allowNull: true },
  })
 };