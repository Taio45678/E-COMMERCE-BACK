const { Usuario, carrocompra, Producto, OrdenCompra } = require('../db');
const mercadopago = require('mercadopago'); // Importa la configuración de Mercado Pago
const nodemailer = require('nodemailer');
require("dotenv").config();
const { ACCESS_TOKEN } = process.env;


// Configurar las opciones de envío de correo electrónico
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tu_correo@gmail.com',
    pass: 'tu_contraseña',
  },
});

mercadopago.configure({
  access_token: ACCESS_TOKEN, // Reemplaza con tu clave de acceso privada
});


 const createPaymentPreference = async (req, res) => {
  try {
    const { usuarioId, productoId, cantidad, returnUrl, cancelUrl } = req.body;

    // Buscar el usuario en la base de datos
    const usuario = await Usuario.findByPk(usuarioId);

    // Buscar el producto en la base de datos
    const producto = await Producto.findByPk(productoId);

    // Crear la preferencia de pago utilizando la información obtenida
    const preference = {
      items: [
        {
          title: producto.nombreproducto,
          unit_price: producto.precioproducto,
          quantity: cantidad,
        },
      ],
      payer: {
        email: usuario.username,
      },
      external_reference: usuarioId.toString(), // Puedes utilizar el ID del usuario como referencia externa
      back_urls: {
        //Aca tenes que poner la URL del deploy 
        ssuccess: "http://localhost:3001/success",
        pending: "http://localhost:3001/pending",
        failure: "http://localhost:3001/failure",
      },
    };

    // Crear la preferencia de pago en Mercado Pago
    const response = await mercadopago.preferences.create(preference);

    // Devolver la respuesta con la preferencia de pago generada
    res.json(response.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error:error.message });
  }
};


 const handlePaymentNotification = async (req, res) => {
    try {
      // Obtener la información de la notificación de pago de Mercado Pago
      const { id, topic, resource } = req.body;
  
      // Verificar que la notificación sea de pago exitoso
      if (topic === 'payment' && resource.status === 'approved') {
        // Obtener el ID del usuario y el ID de la orden desde la referencia externa
        const usuarioId = parseInt(resource.external_reference);
        const ordenId = parseInt(resource.order.id);
  
        // Actualizar el estado de la orden de compra en la base de datos
        const orden = await OrdenCompra.findByPk(ordenId);
        if (orden) {
          orden.estado = 'aprobada';
          await orden.save();
        }
  
        // Enviar correo electrónico de confirmación al usuario
// Actualizar el estado de la orden de compra en la base de datos
const ordenes = await OrdenCompra.findByPk(ordenId);
if (orden) {
  ordenes.estado = 'aprobada';
  await orden.save();

  // Enviar correo electrónico de confirmación al usuario
  const mailOptions = {
    from: 'tu_correo@gmail.com',
    to: usuarioId.login,
    subject: 'Confirmación de compra',
    text: '¡Gracias por tu compra! Tu orden ha sido confirmada.',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Correo electrónico enviado:', info.response);
    }
  });
}

        // Enviar una respuesta exitosa a Mercado Pago para confirmar la recepción de la notificación
        res.sendStatus(200);
      } else {
        // La notificación no es de pago exitoso, se ignora o maneja según sea necesario
        res.sendStatus(200);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error:error.message });
    }
  };

   const receiveWebhook = async (req, res) => {
    try {
      const payment = req.query;
      console.log(payment);
      if (payment.type === "payment") {
        const data = await mercadopago.payment.findById(payment["data.id"]);
        console.log(data);
      }
  
      res.sendStatus(204);
    } catch (error) {
      console.log(error);
      return res.status(500).json({error:error.message });
    }
  };
  
  
  module.exports = {
    createPaymentPreference,
    handlePaymentNotification,
    receiveWebhook
  }