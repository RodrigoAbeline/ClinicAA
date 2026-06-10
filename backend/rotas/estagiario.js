const express = require('express');
const router = express.Router();
const db = require('../db');

// Criar tarefa vinculada a paciente e estagiário
router.post('/', (req, res) => {
  const { titulo, dataFinal, descricao, paciente, estagiario } = req.body;

  // Busca paciente
  db.query('SELECT id_paciente FROM Paciente WHERE nome_paciente = ?', [paciente], (err, resultsPaciente) => {
    if (err) return res.status(500).json({ error: err });
    if (resultsPaciente.length === 0) return res.status(404).json({ error: 'Paciente não encontrado' });

    const id_paciente = resultsPaciente[0].id_paciente;

    // Busca estagiário
    db.query('SELECT id_estagiario FROM Estagiario WHERE nome_estagiario = ?', [estagiario], (err, resultsEstagiario) => {
      if (err) return res.status(500).json({ error: err });
      if (resultsEstagiario.length === 0) return res.status(404).json({ error: 'Estagiário não encontrado' });

      const id_estagiario = resultsEstagiario[0].id_estagiario;

      // Cria consulta vinculada
      db.query(
        'INSERT INTO Consulta (id_paciente, id_estagiario, descricao_paciente) VALUES (?, ?, ?)',
        [id_paciente, id_estagiario, descricao],
        (err, consultaResult) => {
          if (err) return res.status(500).json({ error: err });

          const id_consulta = consultaResult.insertId;

          // Insere tarefa vinculada
          db.query(
            'INSERT INTO To_do (id_paciente, id_estagiario, id_consulta, titulo, descricao, data_conclusao, concluido) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [id_paciente, id_estagiario, id_consulta, titulo, descricao, dataFinal, false],
            (err, result) => {
              if (err) return res.status(500).json({ error: err });
              res.json({ id: result.insertId, titulo, descricao, dataFinal, paciente, estagiario });
            }
          );
        }
      );
    });
  });
});

// Listar tarefas
router.get('/', (req, res) => {
  const sql = `
    SELECT 
      t.id_todo,
      t.titulo,
      t.descricao,
      t.data_conclusao,
      t.concluido,
      p.nome_paciente,
      e.nome_estagiario
    FROM To_do t
    JOIN Paciente p ON t.id_paciente = p.id_paciente
    JOIN Estagiario e ON t.id_estagiario = e.id_estagiario
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

module.exports = router;
