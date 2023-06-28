const { Usuario } = require('../db');


async function obtenerUsuario(req, res) {
  const { id } = req.params;
  const usuarioId = req.usuarioId;

  if (id !== usuarioId) {
    return res.status(403).json({ mensaje: 'Acceso no autorizado' });
  }

  try {
    // Realiza la búsqueda del usuario en la base de datos utilizando el ID
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Devuelve la información del usuario
    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el usuario' });
  }
}

module.exports = {obtenerUsuario};