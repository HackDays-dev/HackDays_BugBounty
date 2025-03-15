const crypto = require("crypto");

// Simulated database (in-memory storage for transactions)
let transactions = [];

exports.processPayment = (req, res) => {
  try {
    const { userId, amount, cardNumber, cvv } = req.body;

    // **🔴 VULNERABILITY: No authentication check for userId**
    if (!userId || !amount || !cardNumber || !cvv) {
      return res.status(400).json({ message: "Missing payment details" });
    }

    // **🔴 VULNERABILITY: Card details are not encrypted**
    const transactionId = crypto.randomUUID();

    // **🔴 VULNERABILITY: Weak amount validation (negative payments allowed)**
    if (amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    transactions.push({ transactionId, userId, amount, cardNumber });

    res.status(200).json({ message: "Payment Successful", transactionId });
  } catch (error) {
    res.status(500).json({ message: "Payment Processing Error" });
  }
};
