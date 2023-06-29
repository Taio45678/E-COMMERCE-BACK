const Usuario  = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function crearNuevoUsuario(login, username, hashedPassword, telefono, direccion) {
  try {
    const usuario = await Usuario.create({
      login: login,
      username: username,
      password: hashedPassword,
      telefono: telefono,
      direccion: direccion
    });

    return usuario;
  } catch (error) {
    throw error;
  }
}

async function registroUsuario(req, res) {
  const { login, username, password, telefono } = req.body;

  try {
    const usuarioExistente = await Usuario.findOne({
      where: {
        login: login
      }
    });

    if (usuarioExistente) {
      return res.status(409).json({ mensaje: 'El usuario ya existe' });
    }

    validationResult(req).throw();

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await crearNuevoUsuario(login, username, hashedPassword, telefono);

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar el usuario' });
  }
}

async function iniciarSesion(req, res) {
  const { login, password } = req.body;

  try {
    const usuario = await Usuario.findOne({
      where: {
        login: login
      }
    });

    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const passwordMatch = await bcrypt.compare(password, usuario.password);

    if (!passwordMatch) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: usuario.id }, 'secreto', { expiresIn: '1h' });

    res.json({ token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al iniciar sesión' });
  }
}

async function cambiarContraseña(req, res) {
  const { usuarioId, contraseñaActual, nuevaContraseña } = req.body;

  try {
    const usuario = await Usuario.findByPk(usuarioId);

    const contraseñaCorrecta = await bcrypt.compare(contraseñaActual, usuario.password);

    if (!contraseñaCorrecta) {
      return res.status(401).json({ mensaje: 'Contraseña actual incorrecta' });
    }

    const mismaContraseña = await bcrypt.compare(nuevaContraseña, usuario.password);

    if (mismaContraseña) {
      return res.status(400).json({ mensaje: 'La nueva contraseña no puede ser igual a la contraseña actual' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(nuevaContraseña, saltRounds);

    usuario.password = hashedPassword;
    await usuario.save();

    res.json({ mensaje: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al cambiar la contraseña' });
  }
}

module.exports = {
  registroUsuario,
  iniciarSesion,
  cambiarContraseña
};
