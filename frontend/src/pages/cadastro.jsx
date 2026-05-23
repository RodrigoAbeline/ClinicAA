import React, { useState } from 'react';
import './profissional.css';

export default function Profissional() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const paciente = {
      nome_paciente: nome,
      cpf: cpf,
      contato_paciente: telefone,
      idade: new Date().getFullYear() - new Date(dataNascimento).getFullYear(),
      login_usuario: email,
      senha_usuario: "123456" // pode gerar senha padrão ou pedir no formulário
    };

    try {
      const response = await fetch('http://localhost:3001/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paciente)
      });

      const data = await response.json();
      console.log("Resposta do backend:", data);
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
    }
  };

  return (
    <>
      <div>
        <h2>Cadastro</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Digite o nome" 
            className="nomeinp" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
          />
          <input 
            type="number" 
            placeholder="Digite o CPF" 
            className="cpfinp" 
            value={cpf} 
            onChange={(e) => setCpf(e.target.value)} 
          />
          <input 
            type="email" 
            placeholder="Digite o Email" 
            className="emailinp" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="date" 
            placeholder="Data de nascimento" 
            className="datainp" 
            value={dataNascimento} 
            onChange={(e) => setDataNascimento(e.target.value)} 
          />
          <input 
            type="number" 
            placeholder="Digite o telefone" 
            className="inttell" 
            value={telefone} 
            onChange={(e) => setTelefone(e.target.value)} 
          />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </>
  );
}