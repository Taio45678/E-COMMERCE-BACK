const { Usuario, Oc, Detalleoc } = require('../db');
const mercadopago = require('mercadopago');
const nodemailer = require('nodemailer');
require("dotenv").config();

const { ACCESS_TOKEN, GOOGLE_TOKEN } = process.env;

const eURL = "https://commerce-back-2025.up.railway.app";

// Configurar las opciones de envío de correo electrónico
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'all.market.henry@gmail.com',
    pass: GOOGLE_TOKEN,
  },
});

mercadopago.configure({
  access_token: "TEST-4280842424471491-070211-516c8b20e0878a4ffcd8b1635fd20deb-1409292019",
});

const createPaymentPreference = async (req, res) => {
  try {
    const { loginuserparam, idocparam } = req.body;

    const itemsx = await Detalleoc.findAll({ where: { idoc: idocparam } });
    if (!itemsx || itemsx.length === 0) {
      return res.status(404).json({ error: 'Detalle de OC NO encontrada' });
    }

    const oc = await Oc.findOne({ where: { idoc: idocparam } });
    if (!oc) {
      return res.status(404).json({ error: 'Orden de compra NO encontrada' });
    }

    const items = itemsx.map(item => ({
      id: item.dataValues.idproducto,
      description: item.dataValues.nombreproducto,
      title: item.dataValues.nombreproducto,
      unit_price: item.dataValues.valorunitario,
      quantity: item.dataValues.cant,
    }));

    const preference = {
      items: [
        {
          title: 'Detalle de la compra',
          unit_price: oc.valortotaloc,
          quantity: 1,
        },
      ],
      payer: {
        email: loginuserparam,
      },
      notification_url: `${eURL}/payment-notification`,
      external_reference: loginuserparam,
      back_urls: {
        success: `${eURL}/success`,
        pending: `${eURL}/pending`,
        failure: `${eURL}/failure`,
      },
    };

    const response = await mercadopago.preferences.create(preference);
    const preferenceId = response.body.id;

    res.json({ preferenceId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const receiveWebhook = async (req, res) => {
  try {
    const { id, topic, resource } = req.body;

    if (topic === 'payment' && resource.status === 'approved') {
      const usuarioId = parseInt(resource.external_reference);

      const orden = await Oc.findOne({ where: { loginuser: usuarioId } });
      if (orden) {
        await orden.update({ estado: 'aprobado' });
      }

      // Enviar correo electrónico de confirmación al usuario
      const usuario = await Usuario.findByPk(usuarioId);
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
    }

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const handlePaymentNotification = async (req, res) => {
  try {
    const { id, topic, resource } = req.body;

    if (topic === 'payment' && resource.status === 'approved') {
      const usuarioId = parseInt(resource.external_reference);

      const paymentData = await mercadopago.payment.findById(id);
      if (paymentData.status === 'approved') {
        const usuario = await Usuario.findByPk(usuarioId);
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

        const orden = await Oc.findOne({ where: { idusuario: usuarioId } });
        if (orden) {
          await orden.update({ estado: 'aprobado' });
        }
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createPaymentPreference, receiveWebhook, handlePaymentNotification };
