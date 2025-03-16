const express = require("express");
const BugReport = require("../models/BugReport");

const router = express.Router();

// Submit Bug Report
router.post("/", async (req, res) => {
    const { user, description, impact } = req.body;

    const report = new BugReport({ user, description, impact });
    await report.save();

    res.json({ message: "Bug report submitted" });
});

// View All Reports
router.get("/", async (req, res) => {
    const reports = await BugReport.find();
    res.json(reports);
});

module.exports = router;
