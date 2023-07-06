const express = require('express');
const router = express.Router();
const paymentController = require("../controllers/paymentController.js");

router.post("/create-order", paymentController.createPaymentPreference);
router.post('/payment-notification', paymentController.handlePaymentNotification);
router.post("/webhook", paymentController.receiveWebhook);

router.get("/success", (req, res) => res.send("Success"));
router.get("/pending", (req, res) => res.send("Pending"));
router.get("/failure", (req, res) => res.send("Failure"));

module.exports = router;