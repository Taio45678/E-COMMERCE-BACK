const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');
const { login } = require('auth0');

const guardarUsuario = async (req, res, next) => {
  try {
    const { email, emailVerified, name, nickname, picture, sub, password } = req.body;

    // Verificar si el usuario ya existe en la base de datos
    const usuarioExistente = await Usuario.findOne({ where: { email } });

    if (usuarioExistente) {
      // El usuario ya existe, realizar el inicio de sesión y generar un token de acceso
      const accessToken = await login(email, sub); // Utiliza tu propia función de inicio de sesión

      // Devolver el token de acceso al cliente
      return res.status(200).json({ message: 'Inicio de sesión exitoso', accessToken });
    }

    // Generar el hash de la contraseña utilizando bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario en la base de datos con la contraseña hasheada
    const nuevoUsuario = await Usuario.create({
      email,
      emailVerified,
      name,
      nickname,
      picture,
      sub,
      password: hashedPassword,
      rol: 2
    });

    return res.status(201).json({ message: 'Usuario creado exitosamente', usuario: nuevoUsuario });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error al guardar el usuario' });
  }
};

module.exports = {
  guardarUsuario
};
