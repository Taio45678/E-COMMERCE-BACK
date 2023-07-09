const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
 sequelize.define('detalleoc', {
  iddetalleoc: {  type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true,  allowNull: false, },
  idproducto: { type: DataTypes.INTEGER, allowNull: true, },
  nombreproducto: { type: DataTypes.STRING, allowNull: true, },
  valorunitario: { type: DataTypes.INTEGER, allowNull: true,  },
  cant: { type: DataTypes.INTEGER, allowNull: true,  },
  subtotal: { type: DataTypes.STRING, allowNull: true,  },
  idoc: { type: DataTypes.INTEGER, allowNull: true,  }
  });
};