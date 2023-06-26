const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productController.js');

// Ruta para obtener todos los productos
router.get('/productos', productoController.obtenerProductos);

// Ruta para crear un nuevo producto
router.post('/productos', productoController.crearProducto);

// Ruta para obtener un producto por su ID
router.get('/productos/:id', productoController.obtenerProductoPorId);

// Ruta para actualizar un producto
router.put('/productos/:id', productoController.actualizarProducto);

// Ruta para eliminar un producto
router.delete('/productos/:id', productoController.eliminarProducto);

module.exports = router;