// backend/rotas/consulta.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// GET consultas
router.get("/", (req, res) => {
  const sql = `
    SELECT c.id_consulta, c.descricao_paciente, c.diagnostico_paciente, c.prescricao,
           c.relatorio_consulta, p.nome_paciente, e.nome_estagiario, pr.nome_professor
    FROM Consulta c
    LEFT JOIN Paciente p ON c.id_paciente = p.id_paciente
    LEFT JOIN Estagiario e ON c.id_estagiario = e.id_estagiario
    LEFT JOIN Professor pr ON c.id_professor = pr.id_professor
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao buscar consultas:", err);
      res.status(500).json({ error: "Erro ao buscar consultas" });
    } else {
      res.json(results);
    }
  });
});

// POST consulta
router.post("/", (req, res) => {
  const { id_paciente, id_estagiario, id_professor, descricao_paciente, diagnostico_paciente, prescricao, relatorio_consulta } = req.body;

  const sql = `
    INSERT INTO Consulta (id_paciente, id_estagiario, id_professor, descricao_paciente, diagnostico_paciente, prescricao, relatorio_consulta)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [id_paciente, id_estagiario, id_professor, descricao_paciente, diagnostico_paciente, prescricao, relatorio_consulta], (err, result) => {
    if (err) {
      console.error("Erro ao inserir consulta:", err);
      res.status(500).json({ error: "Erro ao inserir consulta" });
    } else {
      res.json({
        id_consulta: result.insertId,
        id_paciente,
        id_estagiario,
        id_professor,
        descricao_paciente,
        diagnostico_paciente,
        prescricao,
        relatorio_consulta
      });
    }
  });
});

module.exports = router;
