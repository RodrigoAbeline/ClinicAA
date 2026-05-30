const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


// conexão com banco
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'clinica'
});

db.connect((err) => {

  if (err) {
    console.log('Erro ao conectar no banco');
    console.log(err);
  } else {
    console.log('Banco conectado');
  }

});


// rota cadastro
app.post('/cadastro', (req, res) => {

  const {
    nome_paciente,
    cpf,
    contato_paciente,
    idade,
    login_usuario,
    senha_usuario
  } = req.body;


  // inserir login
  const sqlLogin = `
    INSERT INTO Login
    (
      login_usuario,
      senha_usuario
    )
    VALUES (?, ?)
  `;

  db.query(
    sqlLogin,
    [login_usuario, senha_usuario],
    (err, resultLogin) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          erro: 'Erro ao cadastrar login'
        });
      }

      // pega id do login criado
      const id_login = resultLogin.insertId;

      // inserir paciente
      const sqlPaciente = `
        INSERT INTO Paciente
        (
          id_login,
          nome_paciente,
          idade,
          cpf,
          contato_paciente
        )
        VALUES (?, ?, ?, ?, ?)
      `;

      db.query(
        sqlPaciente,
        [
          id_login,
          nome_paciente,
          idade,
          cpf,
          contato_paciente
        ],
        (err, resultPaciente) => {

          if (err) {

            console.log(err);

            return res.status(500).json({
              erro: 'Erro ao cadastrar paciente'
            });
          }

          return res.status(201).json({
            mensagem: 'Paciente cadastrado com sucesso',
            id_login: id_login,
            id_paciente: resultPaciente.insertId
          });

        }
      );

    }
  );

});


// iniciar servidor
app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});