const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('fotoprod', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    urlfotoprod: { type: DataTypes.STRING, allowNull: false },
    idproducto: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'producto', key: 'id' } },
  });
};