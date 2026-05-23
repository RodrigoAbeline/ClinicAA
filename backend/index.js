// backend/index.js
import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

// Conexão com o banco
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',       // ajuste conforme seu usuário
  password: 'senha',  // ajuste conforme sua senha
  database: 'ClinicAA'
});

// Endpoint para cadastrar paciente
app.post('/cadastro', (req, res) => {
  const { nome_paciente, cpf, contato_paciente, idade, login_usuario, senha_usuario } = req.body;

  // Primeiro insere no Login
  const sqlLogin = 'INSERT INTO Login (login_usuario, senha_usuario) VALUES (?, ?)';
  db.query(sqlLogin, [login_usuario, senha_usuario], (err, resultLogin) => {
    if (err) return res.status(500).json({ error: err });

    const id_login = resultLogin.insertId;

    // Depois insere no Paciente
    const sqlPaciente = `
      INSERT INTO Paciente (id_login, nome_paciente, idade, cpf, contato_paciente)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(sqlPaciente, [id_login, nome_paciente, idade, cpf, contato_paciente], (err, resultPaciente) => {
      if (err) return res.status(500).json({ error: err });

      res.json({ message: 'Paciente cadastrado com sucesso!', id_paciente: resultPaciente.insertId });
    });
  });
});

// Inicia servidor
app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});