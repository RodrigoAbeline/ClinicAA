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

router.post("/", (req, res) => {
  const { login_usuario, senha_usuario } = req.body;

  const sql = "SELECT * FROM Login WHERE login_usuario = ? AND senha_usuario = ?";
  db.query(sql, [login_usuario, senha_usuario], (err, results) => {
    if (err) {
      console.error("Erro ao autenticar login:", err);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Usuário ou senha inválidos" });
    }

    const usuario = results[0];

    // Verifica se é paciente
    db.query("SELECT * FROM Paciente WHERE id_login = ?", [usuario.id_login], (err, pacienteResults) => {
      if (err) return res.status(500).json({ error: "Erro ao buscar paciente" });

      if (pacienteResults.length > 0) {
        return res.json({ tipo: "paciente", dados: pacienteResults[0] });
      }

      // Verifica se é estagiário
      db.query("SELECT * FROM Estagiario WHERE id_login = ?", [usuario.id_login], (err, estagiarioResults) => {
        if (err) return res.status(500).json({ error: "Erro ao buscar estagiário" });

        if (estagiarioResults.length > 0) {
          return res.json({ tipo: "estagiario", dados: estagiarioResults[0] });
        }

        // Caso não seja paciente nem estagiário
        return res.json({ tipo: "login", dados: usuario });
      });
    });
  });
});

module.exports = router;