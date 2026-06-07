import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profissional from './pages/Profissional';
import Cadastro from './pages/Cadastro';
import Estagiario from './pages/Estagiario';
import Paciente from './pages/Paciente';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Paciente" element={<Paciente />} />
        <Route path="/Profissional" element={<Profissional />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/Estagiario" element={<Estagiario />} />
      </Routes>
    </Router>
  );
}

export default App;