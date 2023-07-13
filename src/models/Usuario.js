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
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rol: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isBan: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: false
    },
    last_ip: {
      type: DataTypes.STRING,
      allowNull: false
    },
    logins_count: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nombre:{
      type:DataTypes.STRING,
      allowNull: true,
    },
    fechaNacimiento: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    direccion:{
      type:DataTypes.STRING,
      allowNull: true,
    },
    telefono:{
      type:DataTypes.STRING,
      allowNull:true,
    },
  });
  
  Usuario.associate = (models) => {
    Usuario.hasMany(models.Oc, { foreignKey: 'idusuario', as: 'ordenes' });
  };

  return Usuario;
};