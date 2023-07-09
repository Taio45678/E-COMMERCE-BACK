const { Oc, Detalleoc } = require('../db');

const postOCyDetalle = async (req, res) => {
  const { loginuser, hashvalidacionpago, valortotaloc,estadooc, detalleocx } = req.body;

  try {
   const fechahoraocaux = new Date();
   const fechahoraoc = fechahoraocaux.toISOString();
    const newOC = await Oc.create({  fechahoraoc, loginuser, hashvalidacionpago, valortotaloc, estadooc });
    // Obtener el idoc generado para la OC recién insertada
    const idoc = newOC.idoc;
    // Insertar en la tabla "detalleoc" por cada objeto en "detalleocx"
    for (let i = 0; i < detalleocx.length; i++) {
      const { idproducto, nombreproducto, valorunitario, cant, subtotal } = detalleocx[i];
      await Detalleoc.create({ idoc, idproducto, nombreproducto, valorunitario, cant, subtotal });
    }

    return res.status(201).send(newOC);
  } catch (error) {
    return res.status(500).send({ error: 'Error en consulta' });
  }
};

module.exports = { postOCyDetalle };

