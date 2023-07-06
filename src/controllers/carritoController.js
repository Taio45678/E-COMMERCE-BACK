const { Carrocompra}= require('../db');
 const {Usuario}= require('../db');
 const {Producto} = require('../db');

// Controlador para obtener el carrito de compra de un usuario
async function obtenerCarritoCompra(req, res) {
  const { idusuario } = req.params;

  try {
    const carrito = await Carrocompra.findAll({
      where: {
        idusuario: idusuario
      },
      include: [
        {
          model: Producto,
          attributes: ['nombreproducto', 'precioproducto', 'fotoprinc']
        },
        {
          model: Usuario,
          attributes: ['username', 'login']
        }
      ]
    });

    res.json(carrito);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el carrito de compra' });
  }
}

// Controlador para agregar un producto al carrito de compra
async function agregarProductoCarrito(req, res) {
  const { idusuario, idproducto } = req.body;

  try {
    // Verificar si el producto ya existe en el carrito
    const productoExistente = await Carrocompra.findOne({
      where: {
        idusuario: idusuario,
        idproducto: idproducto
      }
    });

    if (productoExistente) {
      return res.status(400).json({ mensaje: 'El producto ya está en el carrito' });
    }

    const nuevoProducto = await Carrocompra.create({
      idusuario: idusuario,
      idproducto: idproducto
    });

    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al agregar el producto al carrito de compra' });
  }
}

// Controlador para eliminar un producto del carrito de compra
async function eliminarProductoCarrito(req, res) {
  const { id } = req.params;

  try {
    const producto = await Carrocompra.findByPk(id);

    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto del carrito no encontrado' });
    }

    await producto.destroy();

    res.json({ mensaje: 'Producto eliminado del carrito de compra correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el producto del carrito de compra' });
  }
}

module.exports = {
  obtenerCarritoCompra,
  agregarProductoCarrito,
  eliminarProductoCarrito
};
