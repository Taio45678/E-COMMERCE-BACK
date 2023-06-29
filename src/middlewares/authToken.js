const jwt = require('jsonwebtoken');

// Middleware de autenticación con JWT
function autenticacionMiddleware(req, res, next) {
  // Obtener el token de autenticación del encabezado de la solicitud
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ mensaje: 'Token de autenticación no proporcionado' });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, 'secreto');

    // Agregar la información decodificada al objeto de solicitud para su uso posterior
    req.usuarioId = decoded.id;

    // Continuar con el siguiente middleware o ruta
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token de autenticación inválido' });
  }
}

module.exports = autenticacionMiddleware;
