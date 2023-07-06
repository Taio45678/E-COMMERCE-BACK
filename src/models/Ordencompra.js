const { DataTypes } = require('sequelize');
module.exports = (sequelize) =>{
const Ordencompra =sequelize.define('ordencompra', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  idusuario: { type: DataTypes.INTEGER, allowNull: true, },
  idproducto: { type: DataTypes.INTEGER, allowNull: true, },
  direnvio: { type: DataTypes.STRING, allowNull: true },
  emailcontac: { type: DataTypes.STRING, allowNull: true },
  estado: { type: DataTypes.STRING, allowNull: true },  
}
);
return Ordencompra;
}
