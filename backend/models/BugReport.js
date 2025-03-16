const mongoose = require("mongoose");

const BugReportSchema = new mongoose.Schema({
    user: String,
    description: String,
    impact: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("BugReport", BugReportSchema);
