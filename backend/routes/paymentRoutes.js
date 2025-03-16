const express = require("express");
const Payment = require("../models/Payment");

const router = express.Router();

// Insecure Payment Processing
router.post("/", async (req, res) => {
    const { amount } = req.body;

    // 🚨 NO authentication check! Anyone can initiate a payment
    if (!amount) return res.status(400).json({ message: "Amount is required" });

    const payment = new Payment({ amount, status: "Pending" });
    await payment.save();

    res.json({ message: "Payment initiated", id: payment._id });
});

// 🚨 Users can manually mark payment as success (no authentication check)
router.post("/confirm", async (req, res) => {
    const { paymentId } = req.body;

    const payment = await Payment.findById(paymentId);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    payment.status = "Success"; // 🚨 No validation on who is confirming it!
    await payment.save();

    res.json({ message: "Payment confirmed!" });
});

module.exports = router;
