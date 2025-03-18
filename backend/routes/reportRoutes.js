const express = require("express");
const db = require("../db");

const router = express.Router();

router.post("/report", (req, res) => {
    const { userId, description } = req.body;

    db.run(`INSERT INTO reports (user_id, description) VALUES (?, ?)`, [userId, description], function (err) {
        if (err) return res.status(500).json({ error: "Report submission failed" });
        res.json({ message: "Report submitted", reportId: this.lastID });
    });
});

router.get("/reports", (req, res) => {
    db.all(`SELECT * FROM reports`, [], (err, reports) => {
        if (err) return res.status(500).json({ error: "Error fetching reports" });
        res.json({ reports });
    });
});

module.exports = router;
