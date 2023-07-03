const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sub: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isIn: [[1, 2]], // 1 para usuario, 2 para admin
      },
    }
  });

  return Usuario;
};