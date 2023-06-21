const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
 sequelize.define('categoria', {
  idcat: {  type: DataTypes.INTEGER, primaryKey: true, allowNull: false, },
  nombrecat: { type: DataTypes.STRING, allowNull: true, },
  desccat: { type: DataTypes.STRING, allowNull: true, },
  });
};