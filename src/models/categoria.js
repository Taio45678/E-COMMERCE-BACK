const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Categoria = sequelize.define('categoria', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombrecat: { type: DataTypes.STRING, allowNull: false },
  });

  Categoria.associate = (models) => {
    Categoria.hasMany(models.Producto, { foreignKey: 'categoriaId', allowNull: false });
  };

  return Categoria;
};