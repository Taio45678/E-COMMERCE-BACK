const { Oc, Detalleoc, Usuario, Producto } = require('../db');

const generarOrdenDeCompra = async (req, res) => {
  try {
    const { usuarioid, productos } = req.body;

    // Calcular el valor total de la orden de compra
    const valortotaloc = calcularValorTotal(productos);

    // Crear la orden de compra
    const orden = await Oc.create({
      fechahoraoc: new Date().toISOString(),
      hashvalidacion: 'pending',
      idusuario: usuarioid,
      valortotaloc: valortotaloc,
    });

    // Crear los detalles de la orden de compra
    const detalles = productos.map((producto) => ({
      ocId: orden.idoc,
      productoId: producto.id,
      cant: producto.cantidad,
      subtotal: producto.subtotalitem,
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
    total += producto.subtotalitem;
  });
  return total.toFixed(2); // Redondear a 2 decimales
};

module.exports = {
  generarOrdenDeCompra,
};
