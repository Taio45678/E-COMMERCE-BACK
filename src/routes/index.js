const { Router } = require('express');
require("dotenv").config();
const { auth } = require('express-openid-connect');
const {SECRET_KEY,CLIENT_ID,AUTH_URL} = process.env;
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
const { generarOrdenDeCompra } = require('../controllers/ordenCompraController');
const buscarProductos = require('../controllers/searchBarController.js');
const { registroUsuario, iniciarSesion, cambiarContraseña } = require('../controllers/authController.js');
const usuarioController = require('../controllers/auth0Controller.js');
/*const config = {
    authRequired: false,
    auth0Logout: true,
    secret: `${SECRET_KEY}`,
    baseURL: 'http://localhost:3000',
    clientID: `${CLIENT_ID}`,
    issuerBaseURL: `${AUTH_URL}`
  };*/


const router = Router();

router.get('/producto/buscar', buscarProductos);
router.get('/producto', obtenerProductos);
router.post('/productoCrear', /*auth(config),*/ crearProducto);
router.get('/producto/:id', obtenerProductoPorId);
router.put('/producto/:id', /*auth(config),*/ actualizarProducto);
router.delete('/producto/:id', /*auth(config),*/ eliminarProducto);

router.get('/usuarios/:idUsuario/carrito', /*auth(config),*/ obtenerCarritoCompra);
router.post('/usuarios/:idUsuario/carritoCrear', /*auth(config),*/ agregarProductoCarrito);
router.delete('/usuarios/:idUsuario/carrito/:idProducto', /*auth(config),*/ eliminarProductoCarrito);

/*
router.post('/registro', registroUsuario);
router.post('/login', iniciarSesion);
router.post('/cambiar-contraseña', cambiarContraseña);
*/
//este es la ruta para auth0 se supone
router.post('/usuarios', usuarioController.guardarUsuario);
//orden compra
router.post('/generar-orden', generarOrdenDeCompra);
//categorias
router.get('/categorias', obtenerCategorias);
router.post('/categoriasCrear',  crearCategoria);
router.get('/categorias/:id',  obtenerCategoriaPorId);
router.put('/categorias/:id', actualizarCategoria);
router.delete('/categorias/:id', eliminarCategoria);

module.exports = router;
