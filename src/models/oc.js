const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Oc = sequelize.define('oc', {
  idoc: {  type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true,  allowNull: false, },
  fechahoraoc: { type: DataTypes.STRING, allowNull: true, },
  hashvalidacionpago: { type: DataTypes.STRING, allowNull: true, },
  loginuser: { type: DataTypes.STRING, allowNull: true,  },
  valortotaloc: { type: DataTypes.INTEGER, allowNull: true,  },
  estadooc: { type: DataTypes.STRING, allowNull: true,  }
  });
  return Oc;
};