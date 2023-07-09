const { Usuario } = require('../db');

// Controlador para obtener todos los datos de todos los usuarios
const obtenerDatosUsuarios = async (req, res) => {
  try {
    // Obtener todos los usuarios de la base de datos
    const usuarios = await Usuario.findAll();

    // Devolver los datos de todos los usuarios
    return res.json(usuarios);
  } catch (error) {
    // Manejo de errores
    console.error('Error al obtener los datos de los usuarios:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Controlador para obtener todos los datos de un usuario
const obtenerDatosUsuario = async (req, res) => {
  try {
    // Obtener el ID del usuario desde los parámetros de la solicitud
    const { userId } = req.params;

    // Buscar el usuario en la base de datos
    const usuario = await Usuario.findOne({ where: { id: userId } });

    if (!usuario) {
      // Si el usuario no existe, devolver una respuesta de error
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Devolver los datos del usuario
    return res.json(usuario);
  } catch (error) {
    // Manejo de errores
    console.error('Error al obtener los datos del usuario:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};
const actualizarIsBan = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el usuario por su ID
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualizar el valor de 'isBan' a 'true'
    usuario.isBan = true;
    await usuario.save();

    return res.status(200).json({ message: 'El valor de isBan ha sido actualizado a true' });
  } catch (error) {
    console.error('Error al actualizar isBan:', error);
    return res.status(500).json({ message: 'Error al actualizar isBan' });
  }
};
const actualizarRol = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el usuario por su ID
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualizar el valor de 'rol' a 1
    usuario.rol = 2;
    await usuario.save();

    return res.status(200).json({ message: 'El usuario ahora es Admin' });
  } catch (error) {
    console.error('Error al actualizar rol:', error);
    return res.status(500).json({ message: 'Error al actualizar rol' });
  }
};
module.exports = { obtenerDatosUsuarios , obtenerDatosUsuario,actualizarIsBan,actualizarRol };