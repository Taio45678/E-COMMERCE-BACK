const { Router } = require('express');

const { crearProducto, obtenerProductos,obtenerProductoPorId,actualizarProducto,eliminarProducto }  = require('../controllers/productController.js');
const { obtenerCarritoCompra,agregarProductoCarrito,eliminarProductoCarrito } = require('../controllers/carritoController.js');
const { obtenerCategorias, crearCategoria, obtenerCategoriaPorId, actualizarCategoria, eliminarCategoria } = require('../controllers/categoriaController.js');

const router = Router();

// Rutas de productos
 router.get('/producto', obtenerProductos);
 router.post('/productoCrear', crearProducto);
 router.get('/producto/:id', obtenerProductoPorId);
 router.put('/producto/:id', actualizarProducto);
 router.delete('/producto/:id', eliminarProducto);

 //carrito
 //**felipostre */
 router.get('/usuarios/:idUsuario/carrito', obtenerCarritoCompra);
 router.post('/usuarios/:idUsuario/carritoCrear', agregarProductoCarrito); 
 router.delete('/usuarios/:idUsuario/carrito/:idProducto', eliminarProductoCarrito);

 //categorias 

router.get('/categorias', obtenerCategorias);
router.post('/categoriasCrear', crearCategoria);
router.get('/categorias/:id', obtenerCategoriaPorId);
router.put('/categorias/:id', actualizarCategoria);
router.delete('/categorias/:id', eliminarCategoria);

// Rutas de usuarios
//router.use(usuarioRoutes);
// Rutas del carrito de compra

module.exports = router;