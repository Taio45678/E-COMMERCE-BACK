const server = require('./src/app.js');
const { sequelize } = require('./src/db.js');
const DB_PORT = process.env.PORT || 3000;

// Sincronizar los modelos con la base de datos
conn.sync({ force: true }).then(() => {
  server.listen(DB_PORT, () => { console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});