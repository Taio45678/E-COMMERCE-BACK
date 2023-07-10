require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST,DB_NAME,DB_URL,DB_PORT } = process.env;

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

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

  modelDefiners.forEach(model => model(sequelize));

  let entries = Object.entries(sequelize.models);
  let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
  
  // Define las relaciones entre los modelos
  sequelize.models = Object.fromEntries(capsEntries);
  
    const { Carrocompra, Categoria, Ordencompra, Usuario, Producto, Fotoprod, Review,Oc,Detalleoc } = sequelize.models;
  
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
  
    Producto.hasMany(Fotoprod, { foreignKey: 'idproducto' });
    Fotoprod.belongsTo(Producto, { foreignKey: 'idproducto' });
    
    Producto.belongsToMany(Categoria, { through: 'catprod', foreignKey: 'categoriaId'});
    Categoria.belongsToMany(Producto, { through: 'catprod', foreignKey: 'idproducto'})
  
   
Oc.hasMany(Detalleoc, {
  foreignKey: 'ocid',
});
Detalleoc.belongsTo(Oc, {
  foreignKey: 'ocid',
});
    
// Sincroniza los modelos con la base de datos y establece las relaciones
// sequelize.sync({ force: false })
//   .then(() => {
//     console.log('Tablas sincronizadas correctamente');
//     initializeRelations();
//     // Aquí puedes continuar con el resto de tu lógica de la aplicación
//   })
//   .catch(error => {
//     console.error('Error al sincronizar las tablas:', error);
//   });

module.exports = {...sequelize.models, conn: sequelize, sequelize};