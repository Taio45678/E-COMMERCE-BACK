const { Usuario } = require('../db');

// Controlador para obtener todos los datos de todos los usuarios
const obtenerDatosUsuarios = async (req, res) => {
  try {
    const { page, limit } = req.query;

    // Convertir los valores de página y limite en numeros enteros
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Calcular el indice de inicio y fin de los datos paginados
    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = pageNumber * limitNumber;

    // Obtener todos los usuarios de la base de datos
    const usuarios = await Usuario.findAll();
    const totalUsuarios = usuarios.length;
    // Obtener los datos paginados de los usuarios
    const usuariosPaginados = usuarios.slice(startIndex, endIndex);
    const respuesta = {
      totalUsuarios,
      paginaActual: pageNumber,
      usuarios: usuariosPaginados,
    };
    // Devolver los datos paginados de los usuarios
    return res.json(respuesta);
  } catch (error) {
    console.error('Error al obtener los datos de los usuarios:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// obtener todos los datos de un usuario
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

    // Obtener el valor actual de 'isBan'
    const isBanActual = usuario.isBan;

    // Actualizar el valor de 'isBan' a su valor opuesto
    usuario.isBan = !isBanActual;

    // Agregar texto adicional al correo electrónico según el valor de 'isBan'
    const correoElectronico = `${usuario.email}`;

    if (usuario.isBan) {
      // Si 'isBan' es true, agregar el texto adicional
      usuario.email = `ak564dw${correoElectronico}kjsef853f`;
    } else {
      // Si 'isBan' es false, revertir el cambio
      usuario.email = correoElectronico;
    }

    // Guardar el usuario con el cambio en el correo electrónico y el valor de 'isBan'
    await usuario.save();

    return res.status(200).json({ message: 'El valor de isBan ha sido actualizado' });
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