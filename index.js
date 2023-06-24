const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const express = require('express');
const app = express();
const routes = require('./src/routes/index2.js');

// Otros middlewares y configuraciones

app.use(routes);

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, () => { console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});