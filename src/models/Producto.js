const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Producto = sequelize.define('producto', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombreproducto: { type: DataTypes.STRING, allowNull: true },
    descproducto: { type: DataTypes.STRING, allowNull: true },
    colorproducto: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
    fotoprinc: { type: DataTypes.STRING, allowNull: true },
    precioproducto: { type: DataTypes.INTEGER, allowNull: true },
    disponibproducto: { type: DataTypes.INTEGER, allowNull: true },
    fotosecund: {
      type: DataTypes.ARRAY(DataTypes.STRING), 
      allowNull: true, 
      defaultValue: [], 
    },
    borrador: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  });

  Producto.associate = (models) => {
    Producto.belongsTo(models.Categoria, { foreignKey: 'categoriaId', allowNull: false });
  };

  return Producto;
};