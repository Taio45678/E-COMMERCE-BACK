require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST,DB_PORT,DB_NAME,DB_URL } = process.env;

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

// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
//   {
//     logging: false, // set to console.log to see the raw SQL queries
//     native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//   }
// );
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {  Carrocompra, Categoria, Ordencompra, Usuario,  Producto, Fotoprod,Review  } = sequelize.models; 

// Aca vendrian las relaciones

Carrocompra.belongsTo(Usuario, { foreignKey: 'idusuario' });
  Usuario.hasOne(Carrocompra, { foreignKey: 'idusuario' });

  Carrocompra.belongsToMany(Producto, { through: 'prodxcarro', foreignKey: 'idcarrocompra' });
  Producto.belongsToMany(Carrocompra, { through: 'prodxcarro', foreignKey: 'idproducto' });

  Ordencompra.belongsTo(Usuario, { foreignKey: 'idusuario' });
  Usuario.hasMany(Ordencompra, { foreignKey: 'idusuario' });

  Ordencompra.belongsToMany(Producto, { through: 'prodxoc', foreignKey: 'idordencompra' });
  Producto.belongsToMany(Ordencompra, { through: 'prodxoc', foreignKey: 'idproducto' });

  Producto.hasMany(Review, { foreignKey: 'productoId' });
  Review.belongsTo(Producto, { foreignKey: 'productoId' });

  Usuario.hasMany(Review, { foreignKey: 'usuarioId' });
  Review.belongsTo(Usuario, { foreignKey: 'usuarioId' });
// Model.belongsToMany(otherModel, { through: 'activities_countries' });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};