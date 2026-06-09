const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  const { nome, email, telefone, cpf, idade, acompanhante } = req.body;

  // cria login básico
  db.query('INSERT INTO Login (login_usuario, senha_usuario) VALUES (?, ?)', 
    [email, cpf], (err, loginResult) => {
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
              'INSERT INTO Acompanhante (id_paciente, id_login, nome_acompanhante, idade, contato_acompanhante) VALUES (?, ?, ?, ?, ?)',
              [id_paciente, id_login, acompanhante.nome, acompanhante.idade, acompanhante.telefone],
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

router.get('/', (req, res) => {
  const sql = `
    SELECT c.id_consulta, p.nome_paciente, e.nome_estagiario, pr.nome_professor,
           c.descricao_paciente, c.diagnostico_paciente, c.prescricao, c.relatorio_consulta
    FROM Consulta c
    JOIN Paciente p ON c.id_paciente = p.id_paciente
    JOIN Estagiario e ON c.id_estagiario = e.id_estagiario
    JOIN Professor pr ON c.id_professor = pr.id_professor
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

router.post('/', (req, res) => {
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
        'INSERT INTO Estagiario (id_login, nome_estagiario, tempo_estagio, ativo) VALUES (?, ?, ?, ?)',
        [id_login, nome, matricula, true],
        (err) => {
          if (err) return res.status(500).json({ error: err });
          res.json({ message: 'Estagiário cadastrado com sucesso' });
        }
      );
    }
  );
});
module.exports = router;