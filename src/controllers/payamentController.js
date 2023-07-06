const { Usuario, carrocompra, Producto, OrdenCompra } = require('../db');
const mercadopago = require('mercadopago'); // Importa la configuración de Mercado Pago
const nodemailer = require('nodemailer');
require("dotenv").config();
const { ACCESS_TOKEN, GOOGLE_TOKEN } = process.env;


// Configurar las opciones de envío de correo electrónico
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'all.marekt.henry@gmail.com',
    pass: GOOGLE_TOKEN,
  },
});

mercadopago.configure({
  access_token: ACCESS_TOKEN, // Reemplaza con tu clave de acceso privada
});


const createPaymentPreference = async (req, res) => {
  try {
    const { idusuario, idproducto } = req.body;
    
    // // Buscar el usuario en la base de datos

    // // Buscar el producto en la base de datos
    const producto = await Producto.findByPk(idproducto);

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Crear la preferencia de pago utilizando la información obtenida
    const preference = {
      items: [
        {
          title: producto. nombreproducto,
          unit_price: producto.precioproducto,
          quantity: 1,
        },
      ],
      payer: {
        email: "test_user_200519321@testuser.com",
      },
      notification_url: "https://commerce-back-2025.up.railway.app/payment-notification",
      external_reference: idusuario.toString(),
      back_urls: {
        success: "https://commerce-back-2025.up.railway.app/success",
        pending: "https://commerce-back-2025.up.railway.app/pending",
        failure: "https://commerce-back-2025.up.railway.app/failure",
      },
    };

    // Crear la preferencia de pago en Mercado Pago
    const response = await mercadopago.preferences.create(preference);

    // Devolver la respuesta con la preferencia de pago generada
    res.json(response.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const receiveWebhook = async (req, res) => {
  try {
    const payment = req.query;
    console.log(payment);
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"]);
      console.log(data);

      // Verificar que el pago se haya realizado con éxito
      if (data.status === 'approved') {
        const usuarioId = parseInt(data.external_reference);

        // Actualizar el estado del pago en la orden de compra en la base de datos
        const orden = await OrdenCompra.findOne({ where: { idusuario: usuarioId } });
        if (orden) {
          await orden.update({ estado: 'aprobado' });
        }
      }
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

  

const handlePaymentNotification = async (req, res) => {
  try {
    // Obtener la información de la notificación de pago de Mercado Pago
    const { id, topic, resource } = req.body;

    // Verificar que la notificación sea de pago exitoso
    if (topic === 'payment' && resource.status === 'approved') {
      // Obtener el ID del usuario desde la referencia externa
      const usuarioId = parseInt(resource.external_reference);

      // Utilizar receiveWebhook para obtener los datos de confirmación
      const paymentData = await receiveWebhook({ query: { type: 'payment', 'data.id': id } });

      // Verificar si el pago fue aprobado
      if (paymentData.status === 'approved') {
        // Buscar el usuario en la base de datos
        const usuario = await Usuario.findByPk(usuarioId);

        // Enviar correo electrónico de confirmación al usuario
        const mailOptions = {
          from: 'all.market.henry@gmail.com',
          to: usuario.email,
          subject: 'Confirmación de compra',
          text: '¡Gracias por tu compra! Tu pago ha sido aprobado.',
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(error);
          } else {
            console.log('Correo electrónico enviado:', info.response);
          }
        });

        // Actualizar el estado del pago en la orden de compra en la base de datos
        const orden = await OrdenCompra.findOne({ where: { idusuario: usuarioId } });
        if (orden) {
          await orden.update({ estado: 'aprobado' });
        }
      }
    }

    // Enviar una respuesta exitosa a Mercado Pago para confirmar la recepción de la notificación
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
  

   
  module.exports = {
    createPaymentPreference,
    handlePaymentNotification,

  }