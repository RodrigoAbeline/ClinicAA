const express = require("express");
const cors = require("cors");
const db = require('../db');

const app = express();
app.use(cors());
app.use(express.json());


app.get("/todo", (req, res) => {
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
      res.status(500).json({ error: "Erro ao buscar tarefas" });
    } else {
      res.json(results);
    }
  });
});

// Rota POST - adicionar tarefa
app.post("/todo", (req, res) => {
  const { descricao, data_conclusao, id_paciente, id_consulta } = req.body;

  const sql = `
    INSERT INTO To_do (descricao, data_conclusao, concluido, id_paciente, id_consulta)
    VALUES (?, ?, false, ?, ?)
  `;
  db.query(sql, [descricao, data_conclusao, id_paciente, id_consulta], (err, result) => {
    if (err) {
      console.error("Erro ao inserir tarefa:", err);
      res.status(500).json({ error: "Erro ao inserir tarefa" });
    } else {
      res.json({
        id_todo: result.insertId,
        descricao,
        data_conclusao,
        concluido: false,
        id_paciente,
        id_consulta
      });
    }
  });
});

// Iniciar servidor
app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});