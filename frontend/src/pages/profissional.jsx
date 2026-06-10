import React, { useState } from 'react';
import './profissional.css';

export default function Profissional() {
  const [pesquisa, setPesquisa] = useState('');
  const [resultados, setResultados] = useState([]);

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

  // Campos de consulta
  const [horaConsulta, setHoraConsulta] = useState('');
  const [diaSemana, setDiaSemana] = useState('');
  const [dataFinal, setDataFinal] = useState('');

  const handleChange = (e) => setPesquisa(e.target.value);

  const handlePesquisa = async () => {
    try {
      const response = await fetch(`http://localhost:3001/profissional/pesquisa?termo=${pesquisa}`);
      const data = await response.json();
      setResultados(data);
    } catch (error) {
      alert(`❌ Erro na pesquisa: ${error.message}`);
    }
  };

  const handleCadastroPaciente = async (e) => {
    e.preventDefault();

    const paciente = { 
      nome, 
      email, 
      telefone, 
      cpf, 
      idade, 
      senha: senhaPaciente,
      consulta: {
        hora: horaConsulta,
        dia: diaSemana,
        dataFinal
      }
    };

    if (idade < 18) {
      paciente.acompanhante = {
        nome: acompanhanteNome,
        telefone: acompanhanteTelefone,
        idade: acompanhanteIdade
      };
    }

    try {
      const response = await fetch('http://localhost:3001/paciente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paciente)
      });

      const data = await response.json();

      if (response.ok) {
        alert(`✅ Sucesso: ${data.message}`);
      } else {
        alert(`❌ Erro: ${data.error || 'Falha ao cadastrar paciente'}`);
      }
    } catch (error) {
      alert(`❌ Erro inesperado: ${error.message}`);
    }

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
    setHoraConsulta('');
    setDiaSemana('');
    setDataFinal('');
  };

  const handleCadastroEstagiario = async (e) => {
    e.preventDefault();

    const estagiario = { matricula, nome: nomeEstagiario, email: emailEstagiario, senha: senhaEstagiario };

    try {
      const response = await fetch('http://localhost:3001/estagiario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(estagiario)
      });

      const data = await response.json();

      if (response.ok) {
        alert(`✅ Sucesso: ${data.message}`);
      } else {
        alert(`❌ Erro: ${data.error || 'Falha ao cadastrar estagiário'}`);
      }
    } catch (error) {
      alert(`❌ Erro inesperado: ${error.message}`);
    }

    // Limpa os campos
    setMatricula('');
    setNomeEstagiario('');
    setEmailEstagiario('');
    setSenhaEstagiario('');
  };
  // Cadastro Local
const [localNome, setLocalNome] = useState('');
const [horarioDisponivel, setHorarioDisponivel] = useState('');

const handleCadastroLocal = async (e) => {
  e.preventDefault();

  const local = { nome: localNome, horarioDisponivel };

  try {
    const response = await fetch('http://localhost:3001/local', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(local)
    });

    const data = await response.json();

    if (response.ok) {
      alert(`✅ Local cadastrado com sucesso: ${data.message}`);
    } else {
      alert(`❌ Erro: ${data.error || 'Falha ao cadastrar local'}`);
    }
  } catch (error) {
    alert(`❌ Erro inesperado: ${error.message}`);
  }

  setLocalNome('');
  setHorarioDisponivel('');
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
        <button onClick={handlePesquisa}>Pesquisar</button>
      </div>

      {/* Resultados */}
      <div className='resultados'>
        {resultados.map((item) => (
          <div key={item.tipo + item.id} className="resultado-item">
            {item.tipo === 'paciente' && (
              <>
                <p><strong>PACIENTE</strong></p>
                <p>Nome: {item.nome}</p>
                <p>Telefone: {item.contato}</p>
              </>
            )}
            {item.tipo === 'estagiario' && (
              <>
                <p><strong>ESTAGIÁRIO</strong></p>
                <p>Nome: {item.nome}</p>
                <p>Matrícula: {item.contato}</p>
              </>
            )}
            {item.tipo === 'consulta' && (
              <>
                <p><strong>CONSULTA</strong></p>
                <p>Descrição: {item.nome}</p>
                <p>Diagnóstico: {item.contato}</p>
              </>
            )}
          </div>
        ))}
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

          {/* Campos da consulta */}
          <input type="time" value={horaConsulta} onChange={(e) => setHoraConsulta(e.target.value)} required />
          
          <select value={diaSemana} onChange={(e) => setDiaSemana(e.target.value)} required>
            <option value="">Selecione o dia</option>
            <option value="segunda">Segunda-feira</option>
            <option value="terca">Terça-feira</option>
            <option value="quarta">Quarta-feira</option>
            <option value="quinta">Quinta-feira</option>
            <option value="sexta">Sexta-feira</option>
          </select>

          <input type="date" value={dataFinal} onChange={(e) => setDataFinal(e.target.value)} required />

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
          <input 
            type="text" 
            placeholder="Matrícula" 
            value={matricula} 
            onChange={(e) => setMatricula(e.target.value)} 
            required 
          />
          <input 
            type="text" 
            placeholder="Nome" 
            value={nomeEstagiario} 
            onChange={(e) => setNomeEstagiario(e.target.value)} 
            required 
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={emailEstagiario} 
            onChange={(e) => setEmailEstagiario(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Senha" 
            value={senhaEstagiario} 
            onChange={(e) => setSenhaEstagiario(e.target.value)} 
            required 
          />
          <button type="submit" className="btn-primario">Cadastrar Estagiário</button>
        </form>
        
      </div>
    </div>
  );
}
