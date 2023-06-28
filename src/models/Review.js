const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('review', {
      description: {
        type: DataTypes.STRING,
      },
      rating: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      productoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Producto', key: 'id' },
      },
      usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Usuario', key: 'id' },
      },
    });
  };