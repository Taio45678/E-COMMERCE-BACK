const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
 const Detalleoc = sequelize.define('detalleoc', {
  iddetalleoc: {  type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true,  allowNull: false, },
  idproducto: { type: DataTypes.INTEGER, allowNull: true, },
  nombreproducto: { type: DataTypes.STRING, allowNull: true, },
  valorunitario: { type: DataTypes.INTEGER, allowNull: true,  },
  cant: { type: DataTypes.INTEGER, allowNull: true,  },
  subtotal: { type: DataTypes.INTEGER, allowNull: true,  },
  idoc: { type: DataTypes.INTEGER, allowNull: true,  },
  ocid: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  });
  
  return Detalleoc;

};