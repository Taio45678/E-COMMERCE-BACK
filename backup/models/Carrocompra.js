const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Carrocompra = sequelize.define('carrocompra', {
    idcarrocompra: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    idusuario: { type: DataTypes.INTEGER, allowNull: true, references: { model: 'usuario', key: 'id' } },
    idproducto: { type: DataTypes.INTEGER, allowNull: true, references: {model:'producto', key: 'id'}},
  });
  return Carrocompra;
};