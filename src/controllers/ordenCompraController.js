const { Oc, Detalleoc, Usuario } = require('../models');

const generarOrdenDeCompra = async (req, res) => {
  try {
    // Obtener los datos necesarios para la orden de compra
    const { usuarioid, productos } = req.body;

    // Crear la orden de compra
    const orden = await Oc.create({
      fechahoraoc: new Date().toISOString(), // Establecer la fecha y hora actual
      hashvalidacion: 'pending', // Valor por defecto 'pending'
      usuarioid: usuarioid,
      valortotaloc: calcularValorTotal(productos), // Función para calcular el valor total de los productos
      estado: 'pendiente', // Estado inicial de la orden de compra
    });

    // Crear los detalles de la orden de compra
    const detalles = productos.map((producto) => ({
      cant: producto.cantidad,
      subtotal: calcularSubtotal(producto), // Función para calcular el subtotal del producto
      ocId: orden.idoc,
      productoId: producto.id,
    }));

    // Guardar los detalles de la orden de compra en la base de datos
    await Detalleoc.bulkCreate(detalles);

    // Obtener la orden de compra completa con los detalles y el usuario asociado
    const ordenCompleta = await Oc.findOne({
      where: { idoc: orden.idoc },
      include: [
        {
          model: Detalleoc,
          as: 'detalle',
          include: [{ model: Producto, as: 'producto' }],
        },
        { model: Usuario, as: 'usuario' },
      ],
    });

    // Enviar la respuesta con la orden de compra generada
    res.status(200).json({ orden: ordenCompleta });
  } catch (error) {
    console.error('Error al generar la orden de compra:', error);
    res.status(500).json({ error: 'Error al generar la orden de compra' });
  }
};

// Función para calcular el valor total de los productos
const calcularValorTotal = (productos) => {
  let total = 0;
  productos.forEach((producto) => {
    total += producto.precio * producto.cantidad;
  });
  return total.toFixed(2); // Redondear a 2 decimales
};

// Función para calcular el subtotal del producto
const calcularSubtotal = (producto) => {
  return (producto.precio * producto.cantidad).toFixed(2); // Redondear a 2 decimales
};

module.exports = {
  generarOrdenDeCompra,
};
