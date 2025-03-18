const express = require("express");
const db = require("../db"); // Import SQLite database
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

// User Registration Route
router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
    }

    try {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        db.run(
            `INSERT INTO users (username, password) VALUES (?, ?)`,
            [username, hashedPassword],
            function (err) {
                if (err) {
                    return res.status(500).json({ message: "Error registering user: " + err.message });
                }
                res.status(201).json({ message: "User registered", userId: this.lastID });
            }
        );
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Login Route
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Missing credentials" });
    }

    db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
        if (err) return res.status(500).json({ message: "Database error" });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user.id, username: user.username }, "your_secret_key", { expiresIn: "1h" });

        res.json({ message: "Login successful", token });
    });
});


module.exports = router;
