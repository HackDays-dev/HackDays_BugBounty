const express = require("express");
const db = require("../db");

const router = express.Router();

router.post("/pay", (req, res) => {
    const { userId, amount } = req.body;

    db.run(`INSERT INTO transactions (user_id, amount, status) VALUES (?, ?, ?)`, [userId, amount, "pending"], function (err) {
        if (err) return res.status(500).json({ error: "Transaction failed" });
        res.json({ message: "Payment initiated", transactionId: this.lastID });
    });
});

router.get("/transactions/:userId", (req, res) => {
    db.all(`SELECT * FROM transactions WHERE user_id = ?`, [req.params.userId], (err, transactions) => {
        if (err) return res.status(500).json({ error: "Error fetching transactions" });
        res.json({ transactions });
    });
});

module.exports = router;
