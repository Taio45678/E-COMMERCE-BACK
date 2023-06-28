const { DataTypes } = require('sequelize');
sequelize.define('ordencompra', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  idusuario: { type: DataTypes.INTEGER, allowNull: true, references: { model: 'Usuario', key: 'id' } },
  idproducto: { type: DataTypes.INTEGER, allowNull: true, references: {model:'Producto',key:'id'} },
  direnvio: { type: DataTypes.STRING, allowNull: true },
  emailcontac: { type: DataTypes.STRING, allowNull: true },
  estado: { type: DataTypes.STRING, allowNull: true },
});
