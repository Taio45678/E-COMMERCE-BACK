const { DataTypes } = require('sequelize');
module.exports = (sequelize) =>
sequelize.define('ordencompra', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  idusuario: { type: DataTypes.INTEGER, allowNull: true, references: { model: 'usuario', key: 'id' } },
  idproducto: { type: DataTypes.INTEGER, allowNull: true, references: {model:'producto',key:'id'} },
  direnvio: { type: DataTypes.STRING, allowNull: true },
  emailcontac: { type: DataTypes.STRING, allowNull: true },
  estado: { type: DataTypes.STRING, allowNull: true },
});
