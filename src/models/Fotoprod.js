const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('Fotoprod', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    urlfotoprod: { type: DataTypes.STRING, allowNull: true },
    idproducto: { type: DataTypes.INTEGER, allowNull: true, references: { model: 'Producto', key: 'id' } },
  });
};