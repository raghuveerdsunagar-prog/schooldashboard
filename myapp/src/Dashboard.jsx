const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2");

dotenv.config();

const app = express();
app.use(express.json());

// ✅ Allow both local dev and Vercel frontend
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://your-frontend.vercel.app" // replace with your actual Vercel domain
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Database connection (use DB_URL env variable from Render)
const db = mysql.createConnection(process.env.DB_URL);

db.connect(err => {
  if (err) {
    console.error("❌ Database connection failed:", err.stack);
    return;
  }
  console.log("✅ Connected to database.");
});

// ✅ Example protected route
app.post("/adminlogin", (req, res) => {
  const { username, password } = req.body;

  // Example login logic (replace with real DB query)
  if (username === "admin" && password === "admin123") {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.json({ token, role: "admin" });
  }

  res.status(401).json({ error: "Invalid credentials" });
});

// ✅ Example APIs
app.get("/api/summary", (req, res) => {
  db.query("SELECT * FROM summary", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get("/api/teachers", (req, res) => {
  db.query("SELECT * FROM teachers", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get("/api/weekly-trends", (req, res) => {
  db.query("SELECT * FROM weekly_trends", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ✅ Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
