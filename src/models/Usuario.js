const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
const Usuario=  sequelize.define('usuario', {
    id: {  type: DataTypes.INTEGER, autoIncrement: true,  primaryKey: true, },
    login: { type: DataTypes.STRING,   allowNull: true,   unique: true, validate: {  isEmail: true, },  },
    username: {  type: DataTypes.STRING,   allowNull: true,  }, password: { type: DataTypes.STRING, allowNull: true, },
    rol: {   type: DataTypes.INTEGER,   allowNull: true,   validate: {  isIn: [[1, 2]], // 1 para usuario, 2 para admin
      },
    },    
  });
  return Usuario;
};