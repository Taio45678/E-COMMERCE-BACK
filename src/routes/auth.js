const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/userController.js');
const { registroUsuario, iniciarSesion, cambiarContraseña } = require('../controllers/authController');
const { validarRegistro, validarInicioSesion} = require('../middlewares/validaciones');
const autenticacionMiddleware = require('../middlewares/autenticacionMiddleware');

// Ruta para el registro de un nuevo usuario
router.post('/registro', validarRegistro, registroUsuario);

// Ruta para el inicio de sesión de un usuario existente
router.post('/login', validarInicioSesion, iniciarSesion);

// Ruta protegida que requiere autenticación
router.get('/usuario', autenticacionMiddleware, usuarioController);;

router.put('/usuario/cambiar-contraseña', autenticacionMiddleware, cambiarContraseña);

module.exports = router;
