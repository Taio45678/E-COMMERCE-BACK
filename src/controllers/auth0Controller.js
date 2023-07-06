const Usuario = require('../models/Usuario');
const { login } = require('auth0');

const guardarUsuario = async (req, res, next) => {
  try {
    const { email, email_verified, name, nickname, picture, sub } = req.body;

    // Verificar si el usuario ya existe en la base de datos
    const usuarioExistente = await Usuario.findOne({ where: { email } });

    if (usuarioExistente) {
      // El usuario ya existe, realizar el inicio de sesión y generar un token de acceso
      const accessToken = await login(email, sub); // Utiliza tu propia función de inicio de sesión

      // Devolver el token de acceso al cliente
      return res.status(200).json({ message: 'Inicio de sesión exitoso', accessToken });
    }

    // Crear un nuevo usuario en la base de datos
    const nuevoUsuario = await Usuario.create({
      email,
      emailVerified: email_verified,
      name,
      nickname,
      picture,
      sub,
      rol:2
    });

    return res.status(201).json({ message: 'Usuario creado exitosamente', usuario: nuevoUsuario });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error al guardar el usuario' });
  }
};
//////
module.exports = {
  guardarUsuario
};