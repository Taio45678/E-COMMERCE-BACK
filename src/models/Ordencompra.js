const { DataTypes } = require('sequelize');
module.exports = (sequelize) =>
sequelize.define('Ordencompra', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  idusuario: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Usuario', key: 'id' } },
  idproducto: { type: DataTypes.INTEGER, allowNull: false, references: {model:'Producto',key:'id'} },
  direnvio: { type: DataTypes.STRING, allowNull: false },
  emailcontac: { type: DataTypes.STRING, allowNull: false },
  estado: { type: DataTypes.STRING, allowNull: false },
});
