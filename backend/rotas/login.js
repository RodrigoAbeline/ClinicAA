// backend/rotas/login.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// GET logins
router.get("/", (req, res) => {
  db.query("SELECT * FROM Login", (err, results) => {
    if (err) {
      console.error("Erro ao buscar logins:", err);
      res.status(500).json({ error: "Erro ao buscar logins" });
    } else {
      res.json(results);
    }
  });
});

// POST login (criar novo usuário)
router.post("/", (req, res) => {
  const { login_usuario, senha_usuario } = req.body;
  const sql = "INSERT INTO Login (login_usuario, senha_usuario) VALUES (?, ?)";
  db.query(sql, [login_usuario, senha_usuario], (err, result) => {
    if (err) {
      console.error("Erro ao inserir login:", err);
      res.status(500).json({ error: "Erro ao inserir login" });
    } else {
      res.json({ id_login: result.insertId, login_usuario, senha_usuario });
    }
  });
});

module.exports = router;
