const axios = require('axios');

const { Oc, Detalleoc } = require('../db');

const { createPaymentPreference } = require('./payamentController.js');

const dummy1 = { "loginuser":"felipejob1@yahoo.com", "idoc":2 };

const postOCyDetalle = async (req, res) => {
  const { loginuser, hashvalidacionpago, valortotaloc, estadooc, detalleocx } = req.body;

  try {
    const oc = await Oc.findOne({ where: { loginuser, hashvalidacionpago, estadooc: 'pendiente' } });

    if (oc) {
      // Actualizar la orden de compra existente
      await oc.update({ valortotaloc, estadooc });
    } else {
      // Crear una nueva orden de compra
      const fechahoraoc = new Date().toISOString();
      const newOC = await Oc.create({ fechahoraoc, loginuser, hashvalidacionpago, valortotaloc, estadooc });
      console.log('newOC:', newOC);
    }

    // Obtener el idoc generado para la OC recién insertada o actualizada
    const idoc = oc ? oc.idoc : newOC.idoc;

    // Insertar o actualizar en la tabla "detalleoc" por cada objeto en "detalleocx"
    for (let i = 0; i < detalleocx.length; i++) {
      const { idproducto, nombreproducto, valorunitario, cant, subtotal } = detalleocx[i];
      if (oc) {
        // Actualizar el detalle de la orden de compra existente
        await Detalleoc.update(
          { idproducto, nombreproducto, valorunitario, cant, subtotal },
          { where: { idoc } }
        );
      } else {
        // Crear un nuevo detalle de orden de compra
        await Detalleoc.create({ idoc, idproducto, nombreproducto, valorunitario, cant, subtotal });
      }
    }

    const urlx = 'https://commerce-back-2025.up.railway.app/create-order';
    const bodyx = {
      loginuserparam: loginuser,
      idocparam: idoc
    };

    try {
      let response = await axios.post(urlx, bodyx);
      let URLPoint = response.data.init_point;
      console.log('URLPoint: ', URLPoint);

      const algod = {
        orden: 'Por favor, pague en el siguiente enlace:',
        URLo: URLPoint
      };

      return res.status(201).send(algod);
    } catch (error) {
      console.error('Error en la solicitud POST: ', error);
      return res.status(500).send({ error: 'Error en la solicitud POST' });
    }
  } catch (error) {
    console.error('Error en consulta: ', error);
    return res.status(500).send({ error: 'Error en consulta' });
  }
};

module.exports = { postOCyDetalle };


