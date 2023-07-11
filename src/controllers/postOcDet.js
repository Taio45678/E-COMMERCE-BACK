const { Oc, Detalleoc } = require('../db');
const { createPaymentPreference } = require('./payamentController.js');

const postOCyDetalle = async (req, res) => {
  const { loginuser, hashvalidacionpago, valortotaloc, estadooc, detalleocx } = req.body;

  try {
    const fechahoraocaux = new Date();
    const fechahoraoc = fechahoraocaux.toISOString();
    const newOC = await Oc.create({ fechahoraoc, loginuser, hashvalidacionpago, valortotaloc, estadooc });
    const idoc = newOC.idoc;

    for (let i = 0; i < detalleocx.length; i++) {
      const { idproducto, nombreproducto, valorunitario, cant, subtotal } = detalleocx[i];
      await Detalleoc.create({ idoc, idproducto, nombreproducto, valorunitario, cant, subtotal });
    }

    try {
      const response = await createPaymentPreference({ body: { loginuserparam: loginuser, idocparam: idoc } });
      const URLPoint = response.preferenceId;

      return res.status(201).send({ orden: 'Por favor pague en el siguiente enlace:', URLo: URLPoint });
    } catch (error) {
      console.error('Error en createPaymentPreference: ', error);
      return res.status(500).send({ error: 'Error en la creación de la preferencia de pago' });
    }
  } catch (error) {
    console.error('Error en postOCyDetalle: ', error);
    return res.status(500).send({ error: 'Error en la consulta' });
  }
};

module.exports = { postOCyDetalle };
