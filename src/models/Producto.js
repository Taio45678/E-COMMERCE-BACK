const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Producto = sequelize.define('producto', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombreproducto: { type: DataTypes.STRING, allowNull: true },
    descproducto: { type: DataTypes.STRING, allowNull: true },
    colorproducto: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
    fotoprinc: { type: DataTypes.STRING, allowNull: true },
    precioproducto: { type: DataTypes.STRING, allowNull: true },
    disponibproducto: { type: DataTypes.STRING, allowNull: true },
    fotosecund: { type: DataTypes.STRING, allowNull: true },
    categoria: { type: DataTypes.STRING, allowNull: true },
    borrador: { type: DataTypes.BOOLEAN,  allowNull: true, defaultValue: false },    
  });
};
