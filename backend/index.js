const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/upload', express.static(path.join(__dirname, 'upload')));

const SECRET_KEY = "open_sim_sim";

console.log("🚀 Savra Backend Starting...");

// ====== JWT VERIFICATION MIDDLEWARE ======
function verifyAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Bearer <token>
  
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    
    req.user = decoded;
    next();
  });
}

// ====== ADMIN LOGIN ======
app.post("/adminlogin", (req, res) => {
  const { email, password } = req.body;

  console.log("Login attempt:", { email }); 

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const query = "SELECT * FROM admins WHERE email = ?";

  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      console.log("No admin found for email:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const admin = results[0];
    console.log("Password check for:", admin.email); 

    const isMatch = await bcrypt.compare(password, admin.password);
    
    if (!isMatch) {
      console.log("Password mismatch");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: admin.id, role: admin.role, email: admin.email },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    console.log("✅ Login successful for:", admin.email);

    res.status(200).json({
      message: "Login successful",
      token,
      role: admin.role,
    });
  });
});


app.get('/api/summary', verifyAdmin, (req, res) => {
  const sql = `
    SELECT 
      t.teacher_id, t.teacher_name,
      COALESCE(SUM(CASE WHEN a.activity_type = 'Lesson Plan' THEN 1 ELSE 0 END), 0) as total_lessons,
      COALESCE(SUM(CASE WHEN a.activity_type = 'Quiz' THEN 1 ELSE 0 END), 0) as total_quizzes,
      COALESCE(SUM(CASE WHEN a.activity_type = 'Question Paper' THEN 1 ELSE 0 END), 0) as total_assessments,
      COUNT(a.id) as total_activities
    FROM teachers t 
    LEFT JOIN activities a ON t.teacher_id = a.teacher_id 
    GROUP BY t.teacher_id, t.teacher_name
    ORDER BY total_activities DESC
  `;
  
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Summary error:", err);
      return res.status(500).json({ error: "Database Issue" });
    }
    res.json(result);
  });
});

app.get('/api/teachers', verifyAdmin, (req, res) => {
  db.query("SELECT DISTINCT teacher_id, teacher_name FROM teachers ORDER BY teacher_name", (err, result) => {
    if (err) {
      console.error("Teachers error:", err);
      return res.status(500).json({ error: "Database Issue" });
    }
    res.json(result);
  });
});

app.get('/api/weekly-trends', verifyAdmin, (req, res) => {
  const { teacher_id } = req.query;
  const whereClause = teacher_id ? `WHERE a.teacher_id = '${teacher_id}'` : '';
  
  const sql = `
    SELECT 
      DATE_FORMAT(a.created_at, '%Y-%m-%d') as day,
      a.activity_type,
      COUNT(*) as count
    FROM activities a 
    ${whereClause}
    GROUP BY day, a.activity_type
    ORDER BY day ASC, a.activity_type
  `;
  
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Trends error:", err);
      return res.status(500).json({ error: "Database Issue" });
    }
    res.json(result);
  });
});

app.get('/api/teachers/:id', verifyAdmin, (req, res) => {
  const sql = `
    SELECT 
      COUNT(CASE WHEN activity_type = 'Lesson Plan' THEN 1 END) as lessons,
      COUNT(CASE WHEN activity_type = 'Quiz' THEN 1 END) as quizzes,
      COUNT(CASE WHEN activity_type = 'Question Paper' THEN 1 END) as assessments,
      GROUP_CONCAT(DISTINCT subject) as subjects,
      GROUP_CONCAT(DISTINCT grade) as grades
    FROM activities WHERE teacher_id = ?
  `;
  
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error("Teacher details error:", err);
      return res.status(500).json({ error: "Database Issue" });
    }
    res.json(result[0] || {});
  });
});


app.get('/api/test', (req, res) => {
  res.json({ 
    message: "✅ Savra Backend Working Perfectly!",
    endpoints: ['/api/summary', '/api/teachers', '/api/weekly-trends', '/api/teachers/:id'],
    adminLogin: "POST /adminlogin"
  });
});

app.listen(3001, () => {
  console.log("✅ Server running: http://localhost:3001");
  console.log("🔐 Admin Login: POST http://localhost:3001/adminlogin");
  console.log("📊 Protected APIs require JWT token");
});
