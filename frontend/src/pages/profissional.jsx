import React, { useState } from 'react';
import './profissional.css';

export default function Profissional() {
  const [pesquisa, setPesquisa] = useState('');

  // Cadastro Paciente
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [idade, setIdade] = useState('');
  const [senhaPaciente, setSenhaPaciente] = useState('');
  const [acompanhanteNome, setAcompanhanteNome] = useState('');
  const [acompanhanteTelefone, setAcompanhanteTelefone] = useState('');
  const [acompanhanteIdade, setAcompanhanteIdade] = useState('');

  // Cadastro Estagiário
  const [matricula, setMatricula] = useState('');
  const [nomeEstagiario, setNomeEstagiario] = useState('');
  const [emailEstagiario, setEmailEstagiario] = useState('');
  const [senhaEstagiario, setSenhaEstagiario] = useState('');

  const handleChange = (e) => {
    setPesquisa(e.target.value);
    console.log('Pesquisando:', e.target.value);
  };

  const handleCadastroPaciente = async (e) => {
    e.preventDefault();

    const paciente = { nome, email, telefone, cpf, idade, senha: senhaPaciente };
    if (idade < 18) {
      paciente.acompanhante = {
        nome: acompanhanteNome,
        telefone: acompanhanteTelefone,
        idade: acompanhanteIdade
      };
    }

    const response = await fetch('http://localhost:3001/paciente', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paciente)
    });

    const data = await response.json();
    alert(data.message);

    // Limpa os campos
    setNome('');
    setEmail('');
    setTelefone('');
    setCpf('');
    setIdade('');
    setSenhaPaciente('');
    setAcompanhanteNome('');
    setAcompanhanteTelefone('');
    setAcompanhanteIdade('');
  };

  const handleCadastroEstagiario = async (e) => {
    e.preventDefault();

    const estagiario = { matricula, nome: nomeEstagiario, email: emailEstagiario, senha: senhaEstagiario };

    const response = await fetch('http://localhost:3001/estagiario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(estagiario)
    });

    const data = await response.json();
    alert(data.message);

    // Limpa os campos
    setMatricula('');
    setNomeEstagiario('');
    setEmailEstagiario('');
    setSenhaEstagiario('');
  };

  return (
    <div className='container'>
      {/* Área de Pesquisa */}
      <div className="areapes">
        <input
          className="pesquisa"
          type="text"
          placeholder="Pesquisar"
          value={pesquisa}
          onChange={handleChange}
        />
        <p>
          <strong>Pesquise</strong><br />
          O nome do paciente, estagiário ou consulta para ver os detalhes
        </p>
        <button>Pesquisar</button>
      </div>

      {/* Resultados */}
      <div className='resultados'>
        <div className="mostrarestagio">
          <p>Estagiário</p><br />
          <div>Resultado da pesquisa de estagiário</div>
        </div>
        <div className="mostrarpaciente">
          <p>Paciente</p><br />
          <div>Resultado da pesquisa de paciente</div>
        </div>
        <div className="mostrarconsultas">
          <p>Consultas</p><br />
          <div>Resultado da pesquisa de consulta</div>
        </div>
      </div>

      {/* Cadastro Paciente */}
      <div className="cadastro-area">
        <h3>Cadastro de Paciente</h3>
        <form onSubmit={handleCadastroPaciente}>
          <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
          <input type="text" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
          <input type="number" placeholder="Idade" value={idade} onChange={(e) => setIdade(e.target.value)} required />
          <input type="password" placeholder="Senha" value={senhaPaciente} onChange={(e) => setSenhaPaciente(e.target.value)} required />

          {idade && idade < 18 && (
            <div className="acompanhante-area">
              <h4>Dados do Acompanhante</h4>
              <input type="text" placeholder="Nome do Acompanhante" value={acompanhanteNome} onChange={(e) => setAcompanhanteNome(e.target.value)} required />
              <input type="text" placeholder="Telefone do Acompanhante" value={acompanhanteTelefone} onChange={(e) => setAcompanhanteTelefone(e.target.value)} required />
              <input type="number" placeholder="Idade do Acompanhante" value={acompanhanteIdade} onChange={(e) => setAcompanhanteIdade(e.target.value)} required />
            </div>
          )}

          <button type="submit" className="btn-primario">Cadastrar Paciente</button>
        </form>
      </div>

      {/* Cadastro Estagiário */}
      <div className="cadastro-area">
        <h3>Cadastro de Estagiário</h3>
        <form onSubmit={handleCadastroEstagiario}>
          <input type="text" placeholder="Matrícula" value={matricula} onChange={(e) => setMatricula(e.target.value)} required />
          <input type="text" placeholder="Nome" value={nomeEstagiario} onChange={(e) => setNomeEstagiario(e.target.value)} required />
          <input type="email" placeholder="Email" value={emailEstagiario} onChange={(e) => setEmailEstagiario(e.target.value)} required />
          <input type="password" placeholder="Senha" value={senhaEstagiario} onChange={(e) => setSenhaEstagiario(e.target.value)} required />
          <button type="submit" className="btn-primario">Cadastrar Estagiário</button>
        </form>
      </div>
    </div>
  );
}

