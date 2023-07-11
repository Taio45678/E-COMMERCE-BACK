const axios = require('axios');

const { Oc, Detalleoc } = require('../db');

const { createPaymentPreference } = require('./payamentController.js');
const dummy1 = { "loginuser":"felipejob1@yahoo.com", "idoc":2 };

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
    
    console.log('newOC: ', newOC);
    console.log('idoc: ', newOC.idoc);

/** */
     const urlx = 'https://commerce-back-2025.up.railway.app/create-order';
     const bodyx = {
       loginuserparam: loginuser,
       idocparam: idoc
     };

    try{
    let response = await axios.post(urlx, bodyx);
    
    let URLPoint = "";
    URLPoint = response.data.init_point;
    console.log("RESPUESTA PAYMENTCONTROLLER:","FIN - PAYMENTCONTROLLER");
    console.log('URLPoint: ', URLPoint);
   algod =
   {
     orden: "Porfavor pague en el link:",
     URLo: URLPoint
   };
   console.log("TTTTTTT", "KKKKKKK");
//   return res.status(201).send({hola:"felipe", URL:"http://tuhermana"}); 

 return res.status(201).send( algod );   

    } catch (error) {
    console.error('Error en la solicitud POST: ', error);
    }

  
  } catch (error) { 
    console.log(error);
     return res.status(500).send({ error: 'Error en consulta' });  }
};
module.exports = { postOCyDetalle };


