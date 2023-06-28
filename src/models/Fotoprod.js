const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('Fotoprod', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    urlfotoprod: { type: DataTypes.STRING, allowNull: false },
    idproducto: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Producto', key: 'id' } },
  });
};