const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('Producto', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombreproducto: { type: DataTypes.STRING, allowNull: true },
    descproducto: { type: DataTypes.STRING, allowNull: true },
    colorproducto: { type: DataTypes.STRING, allowNull: true },
    fotoprinc: { type: DataTypes.STRING, allowNull: true },
    precioproducto: { type: DataTypes.STRING, allowNull: true },
    disponibproducto: { type: DataTypes.STRING, allowNull: true },
    fotosecund: { type: DataTypes.STRING, allowNull: true },
    categoria: { type: DataTypes.STRING, allowNull: false, references: { model: 'Categoria', key: 'id' } },
    borrador: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
};
