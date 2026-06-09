import React, { useState, useEffect } from 'react';
import './estagiario.css';

export default function Estagiario() {
  const [descricao, setDescricao] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [paciente, setPaciente] = useState('');
  const [estagiario, setEstagiario] = useState('');
  const [tarefas, setTarefas] = useState([]);
  const [relatorioTexto, setRelatorioTexto] = useState('');
  const [nomePaciente, setNomePaciente] = useState('');
  const [presente, setPresente] = useState(false);

  // Carregar tarefas já existentes
  useEffect(() => {
    fetch('http://localhost:3001/todo')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTarefas(data);
        }
      })
      .catch(err => console.error("Erro ao carregar tarefas:", err));
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();

    const novaTarefa = { descricao, dataFinal, paciente, estagiario };

    const response = await fetch('http://localhost:3001/todo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novaTarefa)
    });

    const data = await response.json();

    
    setTarefas(prev => Array.isArray(data) ? [...prev, ...data] : [...prev, data]);

    // Limpa os campos
    setDescricao('');
    setDataFinal('');
    setPaciente('');
    setEstagiario('');
  };

  const handleFinalizarConsulta = () => {
    alert(`Consulta finalizada para ${nomePaciente} - ${presente ? "Presente" : "Ausente"}\nRelatório:\n${relatorioTexto}`);
    setRelatorioTexto('');
    setNomePaciente('');
    setPresente(false);
  };

  return (
    <div className="container-estagiario">
      <div className="conteudo-centro">
        {/* Área To do */}
        <div className="todo-area">
          <div className="form-estagiario">
            <h3>Criar Tarefa (To do)</h3>
            <form onSubmit={handleAddTask}>
              <textarea placeholder="Descrição da atividade" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
              <input type="date" value={dataFinal} onChange={(e) => setDataFinal(e.target.value)} required />
              <input type="text" placeholder="Nome do paciente" value={paciente} onChange={(e) => setPaciente(e.target.value)} required />
              <input type="text" placeholder="Nome do estagiário" value={estagiario} onChange={(e) => setEstagiario(e.target.value)} required />
              <button type="submit" className="btn-primario">Adicionar Tarefa</button>
            </form>
          </div>

          <div className="lista-tarefas">
            <h3>Tarefas Criadas</h3>
            <ul>
              {tarefas.map((t) => (
                <li key={t.id_todo}>
                  <strong>{t.descricao}</strong> <br />
                  Paciente: {t.nome_paciente} | Estagiário: {t.nome_estagiario} <br />
                  Prazo: {t.data_conclusao} <br />
                  <label>
                    <input type="checkbox" checked={t.concluido} readOnly />
                    {t.concluido ? " Concluída" : " Pendente"}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

       
        <div className="relatorio">
          <h3>Relatório</h3>

          
          <input 
            type="text" 
            placeholder="Nome do Paciente" 
            value={nomePaciente} 
            onChange={(e) => setNomePaciente(e.target.value)} 
          />

          
          <label className="checkbox-presente">
            <input 
              type="checkbox" 
              checked={presente} 
              onChange={(e) => setPresente(e.target.checked)} 
            />
            Presente
          </label>

          <textarea
            placeholder="Escreva o relatório aqui..."
            value={relatorioTexto}
            onChange={(e) => setRelatorioTexto(e.target.value)}
          />
          <p>{relatorioTexto ? relatorioTexto : "Nenhum relatório escrito ainda."}</p>

          {/* Botão Finalizar Consulta */}
          <button 
            className="btn-finalizar" 
            onClick={handleFinalizarConsulta}
            disabled={!nomePaciente}
          >
            Finalizar Consulta
          </button>
        </div>
      </div>
    </div>
  );
}
