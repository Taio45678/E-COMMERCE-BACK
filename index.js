const express = require('express');
const app = express();
const routes = require('./routes');

app.use('/api', routes);

// Resto de la configuración de la aplicación...

app.listen(3001, () => {
  console.log('Servidor escuchando en el puerto 3001');
});
