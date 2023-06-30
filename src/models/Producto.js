const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Producto = sequelize.define('producto', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombreproducto: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El nombre del producto no puede estar vacío.'
        },
        len: {
          args: [3, 255],
          msg: 'El nombre del producto debe tener entre 3 y 255 caracteres.'
        }
      }
    },
    descproducto: {
      type: DataTypes.STRING,
      allowNull: true
    },
    colorproducto: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    fotoprinc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    precioproducto: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isDecimal: {
          msg: 'El precio del producto debe ser un número decimal.'
        },
        min: {
          args: 0,
          msg: 'El precio del producto no puede ser negativo.'
        }
      }
    },
    disponibproducto: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: {
          msg: 'La disponibilidad del producto debe ser un número entero.'
        },
        min: {
          args: 0,
          msg: 'La disponibilidad del producto no puede ser negativa.'
        }
      }
    },
    fotosecund: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: []
    },
    borrador: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
  });

  return Producto;
};