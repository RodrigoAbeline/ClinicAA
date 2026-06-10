const express = require('express');
const router = express.Router();
const db = require('../db');

// Cadastro de Paciente
router.post('/paciente', (req, res) => {
  const { nome, email, telefone, cpf, idade, senha, acompanhante } = req.body;

  // cria login básico
  db.query(
    'INSERT INTO Login (login_usuario, senha_usuario) VALUES (?, ?)', 
    [email, senha], 
    (err, loginResult) => {
      if (err) return res.status(500).json({ error: err });

      const id_login = loginResult.insertId;

      // insere paciente
      db.query(
        'INSERT INTO Paciente (id_login, nome_paciente, idade, cpf, contato_paciente) VALUES (?, ?, ?, ?, ?)',
        [id_login, nome, idade, cpf, telefone],
        (err, pacienteResult) => {
          if (err) return res.status(500).json({ error: err });

          const id_paciente = pacienteResult.insertId;

          // se menor de idade, insere acompanhante
          if (idade < 18 && acompanhante) {
            db.query(
              'INSERT INTO Acompanhante (id_paciente, nome_acompanhante, idade, contato_acompanhante) VALUES (?, ?, ?, ?)',
              [id_paciente, acompanhante.nome, acompanhante.idade, acompanhante.telefone],
              (err) => {
                if (err) return res.status(500).json({ error: err });
                res.json({ message: 'Paciente e acompanhante cadastrados com sucesso' });
              }
            );
          } else {
            res.json({ message: 'Paciente cadastrado com sucesso' });
          }
        }
      );
    }
  );
});

// Cadastro de Estagiário
router.post('/estagiario', (req, res) => {
  const { matricula, nome, email, senha } = req.body;

  // Cria login
  db.query(
    'INSERT INTO Login (login_usuario, senha_usuario) VALUES (?, ?)',
    [email, senha],
    (err, loginResult) => {
      if (err) return res.status(500).json({ error: err });

      const id_login = loginResult.insertId;

      // Insere estagiário
      db.query(
        'INSERT INTO Estagiario (id_login, nome_estagiario, matricula_estagiario, ativo) VALUES (?, ?, ?, ?)',
        [id_login, nome, matricula, true],
        (err) => {
          if (err) return res.status(500).json({ error: err });
          res.json({ message: 'Estagiário cadastrado com sucesso' });
        }
      );
    }
  );
});

// Listagem de Consultas
router.get('/consultas', (req, res) => {
  const sql = `
    SELECT c.id_consulta, p.nome_paciente, e.nome_estagiario, pr.nome_professor,
           c.descricao_paciente, c.diagnostico_paciente, c.prescricao, c.relatorio_consulta
    FROM Consulta c
    LEFT JOIN Paciente p ON c.id_paciente = p.id_paciente
    LEFT JOIN Estagiario e ON c.id_estagiario = e.id_estagiario
    LEFT JOIN Professor pr ON c.id_professor = pr.id_professor
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Pesquisa geral
router.get('/pesquisa', (req, res) => {
  const { termo } = req.query;

  const sql = `
    SELECT 'paciente' AS tipo, id_paciente AS id, nome_paciente AS nome, contato_paciente AS contato
    FROM Paciente
    WHERE nome_paciente LIKE ? OR cpf LIKE ?

    UNION

    SELECT 'estagiario' AS tipo, id_estagiario AS id, nome_estagiario AS nome, matricula_estagiario AS contato
    FROM Estagiario
    WHERE nome_estagiario LIKE ? OR matricula_estagiario LIKE ?

    UNION

    SELECT 'consulta' AS tipo, id_consulta AS id, descricao_paciente AS nome, diagnostico_paciente AS contato
    FROM Consulta
    WHERE descricao_paciente LIKE ? OR diagnostico_paciente LIKE ?
  `;

  const likeTerm = `%${termo}%`;

  db.query(sql, [likeTerm, likeTerm, likeTerm, likeTerm, likeTerm, likeTerm], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

module.exports = router;
