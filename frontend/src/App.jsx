import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profissional from './pages/Profissional';
import Cadastro from './pages/Cadastro';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Profissional" element={<Profissional />} />
        <Route path="/Cadastro" element={<Cadastro />} />
      </Routes>
    </Router>
  );
}

export default App;