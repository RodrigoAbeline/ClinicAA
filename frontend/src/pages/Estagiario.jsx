import React, { useState } from 'react';
import './estagiario.css';

export default function Estagiario() {
  const [titulo, setTitulo] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [descricao, setDescricao] = useState('');
  const [paciente, setPaciente] = useState('');
  const [estagiario, setEstagiario] = useState('');
  const [tarefas, setTarefas] = useState([]);
  const [relatorioTexto, setRelatorioTexto] = useState('');

  const handleAddTask = async (e) => {
    e.preventDefault();

    const novaTarefa = { titulo, dataFinal, descricao, paciente, estagiario };

    const response = await fetch('http://localhost:3001/todo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novaTarefa)
    });

    const data = await response.json();
    setTarefas([...tarefas, data]);

    // Limpa os campos
    setTitulo('');
    setDataFinal('');
    setDescricao('');
    setPaciente('');
    setEstagiario('');
  };

  return (
    <div className="container-estagiario">
      <div className="conteudo-centro">
        {/* Área To do */}
        <div className="todo-area">
          <div className="form-estagiario">
            <h3>Criar Tarefa (To do)</h3>
            <form onSubmit={handleAddTask}>
              <input type="text" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
              <input type="date" value={dataFinal} onChange={(e) => setDataFinal(e.target.value)} required />
              <textarea placeholder="Descrição da atividade" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
              <input type="text" placeholder="Nome do paciente" value={paciente} onChange={(e) => setPaciente(e.target.value)} required />
              <input type="text" placeholder="Nome do estagiário" value={estagiario} onChange={(e) => setEstagiario(e.target.value)} required />
              <button type="submit">Adicionar Tarefa</button>
            </form>
          </div>

          <div className="lista-tarefas">
            <h3>Tarefas Criadas</h3>
            <ul>
              {tarefas.map((t, i) => (
                <li key={i}>
                  <strong>{t.titulo}</strong> - Paciente: {t.paciente}, Estagiário: {t.estagiario} <br />
                  {t.descricao} (até {t.dataFinal})
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Área Relatório */}
        <div className="relatorio">
          <h3>Relatório</h3>
          <textarea
            placeholder="Escreva o relatório aqui..."
            value={relatorioTexto}
            onChange={(e) => setRelatorioTexto(e.target.value)}
          />
          <p>{relatorioTexto ? relatorioTexto : "Nenhum relatório escrito ainda."}</p>
        </div>
      </div>
    </div>
  );
}
