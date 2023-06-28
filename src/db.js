require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DB_URL } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const modelDefiner = require(path.join(__dirname, "/models", file));
    modelDefiners.push(modelDefiner);
  });

modelDefiners.forEach((modelDefiner) => modelDefiner(sequelize));

// Define las relaciones entre los modelos
const initializeRelations = () => {
  const {
    Carrocompra,
    Categoria,
    Ordencompra,
    Usuario,
    Producto,
    Fotoprod,
    Review,
  } = sequelize.models;

  Carrocompra.belongsTo(Usuario, { foreignKey: 'idusuario' });
  Usuario.hasOne(Carrocompra, { foreignKey: 'idusuario' });

  Carrocompra.belongsToMany(Producto, { through: 'prodxcarro', foreignKey: 'idcarrocompra' });
  Producto.belongsToMany(Carrocompra, { through: 'prodxcarro', foreignKey: 'idproducto' });

  Ordencompra.belongsTo(Usuario, { foreignKey: 'idusuario' });
  Usuario.hasMany(Ordencompra, { foreignKey: 'idusuario' });

  Ordencompra.belongsToMany(Producto, { through: 'prodxoc', foreignKey: 'idordencompra' });
  Producto.belongsToMany(Ordencompra, { through: 'prodxoc', foreignKey: 'idproducto' });

  Producto.hasMany(Review, { foreignKey: 'idproducto' });
  Review.belongsTo(Producto, { foreignKey: 'idproducto' });

  Producto.hasMany(Fotoprod, { foreignKey: 'idproducto' });
  Fotoprod.belongsTo(Producto, { foreignKey: 'idproducto' });
};

// Sincroniza los modelos con la base de datos y establece las relaciones
(async () => {
  try {
    await sequelize.sync({ alter: true });
    initializeRelations();
    console.log("Base de datos sincronizada y relaciones establecidas correctamente.");
  } catch (error) {
    console.error("Error al sincronizar la base de datos:", error);
  }
})();

module.exports = {
  ...sequelize.models,
  sequelize,
};
