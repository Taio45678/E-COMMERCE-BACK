const { body, validationResult } = require('express-validator');
const joi = require('joi');
const { Usuario } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Función para crear un nuevo usuario en la base de datos
async function crearNuevoUsuario(login, username, hashedPassword) {
  try {
    const usuario = await Usuario.create({
      login: login,
      username: username,
      password: hashedPassword
    });

    return usuario;
  } catch (error) {
    throw error;
  }
}

// Validación de la contraseña utilizando express-validator y joi
const validarContrasena = [
  body('password')
    .notEmpty().withMessage('La contraseña es requerida')
    .custom((value, { req }) => {
      const schema = joi.object({
        password: joi.string()
          .min(7).withMessage('La contraseña debe tener al menos 7 caracteres')
          .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/)
          .withMessage('La contraseña debe contener al menos una mayúscula, una minúscula y un número')
      });

      const { error } = schema.validate({ password: value });
      if (error) {
        throw new Error(error.details[0].message);
      }

      return true;
    })
];

// Controlador para el registro de un nuevo usuario
async function registroUsuario(req, res) {
  const { login, username, password } = req.body;

  try {
    // Verificar si el usuario ya existe en la base de datos
    const usuarioExistente = await Usuario.findOne({
      where: {
        login: login
      }
    });

    if (usuarioExistente) {
      return res.status(409).json({ mensaje: 'El usuario ya existe' });
    }

    // Validar contraseña
    validationResult(req).throw();

    // Generar hash de la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crear nuevo usuario
    await crearNuevoUsuario(login, username, hashedPassword);

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar el usuario' });
  }
}

// Controlador para el inicio de sesión de un usuario existente
async function iniciarSesion(req, res) {
  const { login, password } = req.body;

  try {
    // Verificar si el usuario existe en la base de datos
    const usuario = await Usuario.findOne({
      where: {
        login: login
      }
    });

    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(password, usuario.password);

    if (!passwordMatch) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Generar token de autenticación
    const token = jwt.sign({ id: usuario.id }, 'secreto', { expiresIn: '1h' });

    res.json({ token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al iniciar sesión' });
  }
}

const { Usuario } = require('../db');
const bcrypt = require('bcrypt');

// Controlador para cambiar la contraseña del usuario
async function cambiarContraseña(req, res) {
  const { usuarioId, contraseñaActual, nuevaContraseña } = req.body;

  try {
    // Obtener el usuario de la base de datos
    const usuario = await Usuario.findByPk(usuarioId);

    // Verificar si la contraseña actual es correcta
    const contraseñaCorrecta = await bcrypt.compare(contraseñaActual, usuario.password);

    if (!contraseñaCorrecta) {
      return res.status(401).json({ mensaje: 'Contraseña actual incorrecta' });
    }

    // Verificar que la nueva contraseña no sea la misma que la actual
    const mismaContraseña = await bcrypt.compare(nuevaContraseña, usuario.password);

    if (mismaContraseña) {
      return res.status(400).json({ mensaje: 'La nueva contraseña no puede ser igual a la contraseña actual' });
    }

    // Generar el hash de la nueva contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(nuevaContraseña, saltRounds);

    // Actualizar la contraseña en la base de datos
    usuario.password = hashedPassword;
    await usuario.save();

    res.json({ mensaje: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al cambiar la contraseña' });
  }
}


module.exports = {
  validarContrasena,
  registroUsuario,
  iniciarSesion,
  cambiarContraseña
};
