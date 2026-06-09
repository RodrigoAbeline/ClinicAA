const express = require("express");
const router = express.Router();
const db = require("../db");

// GET - listar tarefas
router.get("/", (req, res) => {
  const sql = `
    SELECT t.id_todo, t.descricao, t.data_conclusao, t.concluido,
           p.nome_paciente, e.nome_estagiario
    FROM To_do t
    LEFT JOIN Paciente p ON t.id_paciente = p.id_paciente
    LEFT JOIN Consulta c ON t.id_consulta = c.id_consulta
    LEFT JOIN Estagiario e ON c.id_estagiario = e.id_estagiario
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao buscar tarefas:", err);
      // Retorna array vazio em vez de objeto
      return res.status(500).json([]);
    }
    // Garante que sempre seja array
    res.json(Array.isArray(results) ? results : []);
  });
});

// POST - adicionar tarefa
router.post("/", (req, res) => {
  const { descricao, data_conclusao, id_paciente, id_consulta } = req.body;

  const sql = `
    INSERT INTO To_do (descricao, data_conclusao, concluido, id_paciente, id_consulta)
    VALUES (?, ?, false, ?, ?)
  `;
  db.query(sql, [descricao, data_conclusao, id_paciente, id_consulta], (err, result) => {
    if (err) {
      console.error("Erro ao inserir tarefa:", err);
      // Retorna objeto consistente mas dentro de array
      return res.status(500).json([]);
    }
    res.json([{
      id_todo: result.insertId,
      descricao,
      data_conclusao,
      concluido: false,
      id_paciente,
      id_consulta
    }]);
  });
});

module.exports = router;