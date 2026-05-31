const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Importa rotas
const pacienteRoutes = require('./routes/paciente');
const estagiarioRoutes = require('./routes/estagiario');
const consultaRoutes = require('./routes/consulta');
const loginRoutes = require('./routes/login');

// Usa rotas
app.use('/paciente', pacienteRoutes);
app.use('/estagiario', estagiarioRoutes);
app.use('/consulta', consultaRoutes);
app.use('/login', loginRoutes);

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});