const express = require("express");
const router = express.Router();
const db = require("../db");

// Lista pacientes
router.get("/", (req, res) => {
  db.query("SELECT * FROM Paciente", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao buscar pacientes" });
    } else {
      res.json(results);
    }
  });
});

// Lista consultas com data e horário
router.get("/consultas", (req, res) => {
  const sql = `
    SELECT 
      c.id_consulta,
      c.data_consulta,
      c.hora_consulta,
      p.nome_paciente,
      e.nome_estagiario
    FROM Consulta c
    JOIN Paciente p ON c.id_paciente = p.id_paciente
    JOIN Estagiario e ON c.id_estagiario = e.id_estagiario
    ORDER BY c.data_consulta, c.hora_consulta
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao buscar consultas" });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
