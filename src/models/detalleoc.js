const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Detalleoc = sequelize.define('detalleoc', {
    iddetalleoc: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
    cant: { type: DataTypes.STRING, allowNull: true },
    subtotal: { type: DataTypes.STRING, allowNull: true }
  });

  Detalleoc.associate = (models) => {
    Detalleoc.belongsTo(models.oc, { foreignKey: 'ocId', as: 'orden' });
    Detalleoc.belongsTo(models.producto, { foreignKey: 'productoId', as: 'producto' });
  };

  return Detalleoc;
};