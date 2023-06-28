const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
const Usuario=  sequelize.define('usuario', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isIn: [[1, 2]], // 1 para usuario, 2 para admin
      },
    },
    tableName: 'usuarios',
  });
  return Usuario;
};