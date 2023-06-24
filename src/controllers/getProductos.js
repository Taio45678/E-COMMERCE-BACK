const { Producto } = require('../db.js');

// Obtener todos los productos
const getProductos = async (req, res, next) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    next(error);
  }
};

// Crear un nuevo producto
const crearProducto = async (req, res, next) => {
  try {
    const { nombreproducto,descproducto,fotoprinc,precioproducto,disponibproducto,fotosecund,categori  } = req.body;

    const nuevoProducto = await Producto.create({
      nombreproducto,
      descproducto,
      fotoprinc,
      precioproducto,
      disponibproducto,
      fotosecund,
      categori,
    });

    res.status(201).json(nuevoProducto);
  } catch (error) {
    next(error);
  }
};

// Actualizar un producto existente
const actualizarProducto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombreproducto,descproducto,fotoprinc,precioproducto,disponibproducto,fotosecund,categori  } = req.body;

    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    await producto.update({
      nombreproducto,
      descproducto,
      fotoprinc,
      precioproducto,
      disponibproducto,
      fotosecund,
      categori,
    });

    res.json(producto);
  } catch (error) {
    next(error);
  }
};

// Eliminar un producto
const eliminarProducto = async (req, res, next) => {
  try {
    const { id } = req.params;

    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    await producto.destroy();

    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};