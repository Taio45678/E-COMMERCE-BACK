require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DB_URL } = process.env;
const UsuarioModel = require('./models/Usuario.js');
//const AdministradorModel = require('./models/Administrador');
const ProductoModel = require('./models/Producto.js');
const CategoriaModel = require('./models/Categorias.js');
const CarritoCompraModel = require('./models/Carrocompra.js');
const OrdenCompraModel = require('./models/Ordencompra.js');
const ReviewModel = require('./models/Review.js');
const FotoProdModel = require('./models/Fotoprod.js');

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



// Definir las relaciones entre los modelos
const initializeRelations = () => {
  const { Usuario, Producto, Carrocompra, Ordencompra, Review, Categoria } = sequelize.models;

  // Relaciones del modelo Usuario
  Usuario.hasOne(Carrocompra);
  Usuario.hasMany(Ordencompra);
  Usuario.hasMany(Review);

  // Relaciones del modelo CarritoCompra
  Carrocompra.belongsTo(Usuario);
  Carrocompra.belongsToMany(Producto, { through: 'CarritoProducto' });

  // Relaciones del modelo OrdenCompra
  Ordencompra.belongsTo(Usuario);
  Ordencompra.belongsToMany(Producto, { through: 'OrdenProducto' });

  // Relaciones del modelo Producto
  Producto.belongsToMany(Carrocompra, { through: 'CarritoProducto' });
  Producto.belongsToMany(Ordencompra, { through: 'OrdenProducto' });
  Producto.hasMany(Review);
  Producto.belongsTo(Categoria);

  // Relaciones del modelo Review
  Review.belongsTo(Producto);
  Review.belongsTo(Usuario);

  // Resto de relaciones...
};

// Sincronizar los modelos con la base de datos y establecer las relaciones
sequelize.sync({ force: false })
  .then(() => {
    console.log('Tablas sincronizadas correctamente');
    initializeRelations();
    // Aquí puedes continuar con el resto de tu lógica de la aplicación
  })
  .catch(error => {
    console.error('Error al sincronizar las tablas:', error);
  });

// Exportar los modelos y Sequelize
module.exports = {
  Usuario: UsuarioModel,
  Producto: ProductoModel,
  Carrocompra: CarritoCompraModel,
  OrdenCompra: OrdenCompraModel,
  Review: ReviewModel,
  Categoria: CategoriaModel,
  sequelize,
};