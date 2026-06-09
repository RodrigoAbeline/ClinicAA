const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Vini123',
  database: 'clinica'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no banco:', err);
    return;
  }
  console.log('Conectado ao MySQL!');
});

module.exports = db;