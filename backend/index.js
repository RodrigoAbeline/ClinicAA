const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

// Importa rotas
const pacienteRoutes = require('./rotas/paciente');
const estagiarioRoutes = require('./rotas/estagiario');
const consultaRoutes = require('./rotas/consulta');
const loginRoutes = require('./rotas/login');
const todoRoutes = require('./rotas/todo');

// Usa rotas
app.use('/paciente', pacienteRoutes);
app.use('/estagiario', estagiarioRoutes);
app.use('/consulta', consultaRoutes);
app.use('/login', loginRoutes);
app.use('/todo', todoRoutes);


app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});