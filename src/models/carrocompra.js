const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('Carrocompra', {
    idcarrocompra: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    idusuario: { type: DataTypes.INTEGER, allowNull: true, references: { model: 'Usuario', key: 'id' } },
    idproducto: { type: DataTypes.INTEGER, allowNull: true, references: {model:'Producto', key: 'id'}},
  });
};