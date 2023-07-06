const { Oc, Detalleoc, Usuario } = require('../db');

const generarOrdenDeCompra = async (req, res) => {
  try {
    const { idusuario, hashvalidacionpago, valortotaloc, detalleoc } = req.body;

    const orden = await Oc.create({
      fechahoraoc: new Date().toISOString(),
      estado: 'pendiente',
      hashvalidacion: hashvalidacionpago,
      idusuario: idusuario,
      valortotaloc: valortotaloc,
    });

    const detalles = detalleoc.map((detalle) => ({
      cant: detalle.cant,
      subtotal: detalle.subtotal,
      ocId: orden.idoc,
      productoId: detalle.idproducto,
    }));

    await Detalleoc.bulkCreate(detalles);

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

module.exports = {
  generarOrdenDeCompra,
};
