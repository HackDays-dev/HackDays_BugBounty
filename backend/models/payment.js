const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    amount: Number,
    status: { type: String, default: "Pending" },
});

module.exports = mongoose.model("Payment", PaymentSchema);
