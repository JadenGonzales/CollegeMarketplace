const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend to talk to backend

// SQL Server Configuration
const config = {
    user: "node_user",
    password: "password123",
    server: "localhost",
    database: "CollegeMarketplace",
    options: { encrypt: false, trustServerCertificate: true },
};

// Login Route
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Connect to SQL Server
        await sql.connect(config);
        const result = await sql.query`SELECT * FROM Users WHERE username = ${username} AND password = ${password}`;

        if (result.recordset.length > 0) {
            res.json({ success: true, message: "Login successful!" });
        } else {
            res.json({ success: false, message: "Invalid username or password." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// Start the server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
