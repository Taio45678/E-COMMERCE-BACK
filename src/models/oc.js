const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
 const Oc = sequelize.define('oc', {
  idoc: {  type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true,  allowNull: false, },
  fechahoraoc: { type: DataTypes.STRING, allowNull: true, },
  hashvalidacion: {
    type: DataTypes.ENUM('pending', 'failure', 'success'),
    defaultValue: 'pending',
    allowNull: false
  }, 
  idusuario: { type: DataTypes.INTEGER, allowNull: true,  },
  valortotaloc: { type: DataTypes.STRING, allowNull: true,  },
  });
  Oc.associate = (models) => {
    Oc.belongsTo(models.Usuario, { foreignKey: 'idusuario', as: 'usuario' });
    Oc.hasMany(models.detalleoc, { foreignKey: 'ocId', as: 'detalle' });
  };
  return Oc;
};