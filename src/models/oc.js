const { DataTypes } = require('sequelize');
const {Usuario} = require('../db');
module.exports = (sequelize) => {
  const Oc = sequelize.define('oc', {
  idoc: {  type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true,  allowNull: false, },
  fechahoraoc: { type: DataTypes.STRING, allowNull: true, },
  hashvalidacionpago: { type: DataTypes.STRING, allowNull: true, },
  loginuser: { type: DataTypes.STRING, allowNull: true,  },
  valortotaloc: { type: DataTypes.INTEGER, allowNull: true,  },
  estadooc: { type: DataTypes.STRING, allowNull: true,  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Usuario,
      key: 'id', // La columna de la tabla "usuarios" que se utilizará para la relación
    },
  }});
  
  return Oc;
};