const path = require("path");
const express = require("express");
const cors = require("cors");
const transporter = require("./mailer");
const upload = require("./upload");
const db = require("./db");
const app = express();
const PORT = 3001;

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// In-memory data for documents/comments/versions only
let documents = [];
let comments = [];
let versions = [];

// List all users (GET /api/users)
app.get("/api/users", (req, res) => {
  const { email } = req.query;
  let sql = "SELECT * FROM users";
  let params = [];
  if (email) {
    sql += " WHERE email = ?";
    params.push(email);
  }
  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Delete user by id
app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});
// Registration endpoint with profile picture upload
app.post("/api/register", upload.single("profilePic"), (req, res) => {
  const { name, email, phone } = req.body;
  const profilePic = req.file ? req.file.filename : null;
  if (!name || !email || !phone || !profilePic) {
    return res
      .status(400)
      .json({ error: "All fields including profile picture are required" });
  }
  db.query(
    "INSERT INTO users (name, email, phone, profilePic) VALUES (?, ?, ?, ?)",
    [name, email, phone, profilePic],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      // Send registration email
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Registration Successful",
        text: `Hello ${name},\n\nYour registration was successful!`,
        html: `<h2>Welcome, ${name}!</h2><p>Your registration was <b>successful</b>.</p>`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
      res.json({ id: result.insertId, name, email, phone, profilePic });
    }
  );
});

// Update user
app.put("/api/users/:id", upload.single("profilePic"), (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const profilePic = req.file ? req.file.filename : null;
  let sql = "UPDATE users SET name = ?, email = ?, phone = ?";
  let params = [name, email, phone];
  if (profilePic) {
    sql += ", profilePic = ?";
    params.push(profilePic);
  }
  sql += " WHERE id = ?";
  params.push(id);
  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    db.query("SELECT * FROM users WHERE id = ?", [id], (err2, rows) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json(rows[0]);
    });
  });
});

// Delete user
app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// ...existing code...

// Collaboration (add user to doc)
app.post("/api/documents/:id/collaborators", (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const doc = documents.find((d) => d.id == id);
  if (!doc) return res.status(404).json({ error: "Document not found" });
  if (!doc.collaborators.includes(userId)) doc.collaborators.push(userId);
  res.json(doc);
});

// Comments
app.post("/api/documents/:id/comments", (req, res) => {
  const { id } = req.params;
  const { userId, text } = req.body;
  if (!userId || !text)
    return res.status(400).json({ error: "userId and text required" });
  const comment = {
    id: Date.now(),
    docId: id,
    userId,
    text,
    timestamp: Date.now(),
  };
  comments.push(comment);
  res.json(comment);
});

app.get("/api/documents/:id/comments", (req, res) => {
  const { id } = req.params;
  res.json(comments.filter((c) => c.docId == id));
});

// Versions
app.get("/api/documents/:id/versions", (req, res) => {
  const { id } = req.params;
  const doc = documents.find((d) => d.id == id);
  if (!doc) return res.status(404).json({ error: "Document not found" });
  res.json(doc.versions);
});

app.get("/", (req, res) => {
  res.send("Welcome to the Document Collaboration API");
});

app.listen(PORT, () => {
  console.log(`Server running on port localhost:${PORT}`);
});
