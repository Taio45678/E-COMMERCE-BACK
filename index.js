const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const obtenerDatosDeAuth0 = require('./src/controllers/auth0Controller.js')
const PORT = process.env.PORT
// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  try {
    // Obtener los datos de Auth0 y guardarlos en la base de datos
    await obtenerDatosDeAuth0();
    server.listen(3001, () => {
      console.log(`Server listening on port ${PORT}`);
    });
    setInterval(async () => {
      await obtenerDatosDeAuth0();
      console.log('Usuarios sincronizados');
    }, 1 * 60 * 1000); // 5 minutos en milisegundos
  } catch (error) {
    console.error('Error al cargar los datos en la base de datos:', error);
    process.exit(1); // Salir de la aplicación si ocurre un error
  }
});
