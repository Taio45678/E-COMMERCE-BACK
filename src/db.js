require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DB_URL } = process.env;

let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
      database: DB_NAME,
      dialect: "postgres",
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USER,
      password: DB_PASSWORD,
      pool: {
        max: 3,
        min: 1,
        idle: 10000,
      },
      dialectOptions: {
        ssl: {
          require: true,
          // Ref.: https://github.com/brianc/node-postgres/issues/2009
          rejectUnauthorized: false,
        },
        keepAlive: true,
      },
      ssl: true,
    })
    : new Sequelize(
      `${DB_URL}`,
      { logging: false, native: false }
    );

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
  const { carrocompra, categoria, ordencompra, usuario, producto, fotoprod, review } = sequelize.models;

  carrocompra.belongsTo(usuario, { foreignKey: 'idusuario' });
  usuario.hasOne(carrocompra, { foreignKey: 'idusuario' });

  carrocompra.belongsToMany(producto, { through: 'prodxcarro', foreignKey: 'idcarrocompra' });
  producto.belongsToMany(carrocompra, { through: 'prodxcarro', foreignKey: 'idproducto' });

  ordencompra.belongsTo(usuario, { foreignKey: 'idusuario' });
  usuario.hasMany(ordencompra, { foreignKey: 'idusuario' });

  ordencompra.belongsToMany(producto, { through: 'prodxoc', foreignKey: 'idordencompra' });
  producto.belongsToMany(ordencompra, { through: 'prodxoc', foreignKey: 'idproducto' });

  producto.hasMany(review, { foreignKey: 'idproducto' });
  review.belongsTo(producto, { foreignKey: 'idproducto' });

  producto.hasMany(fotoprod, { foreignKey: 'idproducto' });
  fotoprod.belongsTo(producto, { foreignKey: 'idproducto' });
};

// Sincroniza los modelos con la base de datos y establece las relaciones
sequelize.sync({ force: false })
  .then(() => {
    console.log('Tablas sincronizadas correctamente');
    initializeRelations();
    // Aquí puedes continuar con el resto de tu lógica de la aplicación
  })
  .catch(error => {
    console.error('Error al sincronizar las tablas:', error);
  });

module.exports = {
  ...sequelize.models,
  sequelize,
};
