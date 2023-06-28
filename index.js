const server = require('./src/app.js');
const { sequelize } = require('./src/db.js');
const DB_PORT = process.env.PORT || 3000;

// Sincronizar los modelos con la base de datos
sequelize.sync({ force: false })
  .then(() => {
    server.listen(DB_PORT, '0.0.0.0', () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });
