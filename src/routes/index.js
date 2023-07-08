const { Router } = require('express');
require("dotenv").config();
const { auth } = require('express-openid-connect');
const {SECRET_KEY,CLIENT_ID,AUTH_URL} = process.env;
const {getAllUsers, createUser, getUserById, updateUser, deleteUser, getAccessToken } = require('../controllers/auth0Controller.js');
const {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto
} = require('../controllers/productController.js');

const {
  obtenerCarritoCompra,
  agregarProductoCarrito,
  eliminarProductoCarrito
} = require('../controllers/carritoController.js');

const {
  obtenerCategorias,
  crearCategoria,
  obtenerCategoriaPorId,
  actualizarCategoria,
  eliminarCategoria
} = require('../controllers/categoriaController.js');
const { postOCyDetalle} = require('../controllers/postOcDet.js');
const buscarProductos = require('../controllers/searchBarController.js');
const { obtenerDatosUsuarios ,obtenerDatosUsuario,actualizarIsBan,actualizarRol } = require('../controllers/userController');
const {guardarUsuario} = require('../controllers/auth0Controller.js');
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: `${SECRET_KEY}`,
    baseURL: 'https://e-commerce-front-alpha.vercel.app/',
    clientID: `${CLIENT_ID}`,
    issuerBaseURL: `${AUTH_URL}`
  };


const router = Router();

//////////
router.get('/producto/buscar', buscarProductos);
router.get('/producto', obtenerProductos);
router.post('/productoCrear', auth(config), crearProducto);
router.get('/producto/:id', obtenerProductoPorId);
router.put('/producto/:id', auth(config), actualizarProducto);
router.delete('/producto/:id', /*auth(config),*/ eliminarProducto);

/*
router.post('/registro', registroUsuario);
router.post('/login', iniciarSesion);
router.post('/cambiar-contraseña', cambiarContraseña);
*/

//este es la ruta para auth0 se supone
router.put('/usuarios/:id/isban', actualizarIsBan);
router.put('/usuarios/:id/rol', actualizarRol);
router.get('/usuarios/:userId', obtenerDatosUsuario);
router.get('/usuarios', obtenerDatosUsuarios);
//orden compra

router.post('/generar-orden', postOCyDetalle);
//categorias
router.get('/categorias', obtenerCategorias);
router.post('/categoriasCrear',  crearCategoria);
router.get('/categorias/:id',  obtenerCategoriaPorId);
router.put('/categorias/:id', actualizarCategoria);
router.delete('/categorias/:id', eliminarCategoria);

module.exports = router;
