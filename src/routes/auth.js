const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/userController.js');
const { registroUsuario, iniciarSesion, cambiarContraseña } = require('../controllers/authController');
const { validarContrasenaRegistro, validarInicioSesion,validarContrasena} = require('../validations/authValidations.js');
const autenticacionMiddleware = require('../middlewares/authToken.js');

// Ruta para el registro de un nuevo usuario
router.post('/registro', validarContrasenaRegistro, registroUsuario);

// Ruta para el inicio de sesión de un usuario existente
router.post('/login', validarInicioSesion, iniciarSesion);

// Ruta protegida que requiere autenticación
router.get('/usuario', /*autenticacionMiddleware,*/ usuarioController);

// Ruta para cambiar la contraseña del usuario (también requiere autenticación)
router.put('/usuario/cambiar-contraseña', /*autenticacionMiddleware,*/ validarContrasena, cambiarContraseña);

module.exports = router;
