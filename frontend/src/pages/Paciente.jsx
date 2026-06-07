import React, { useState, useEffect } from "react";
import "./paciente.css";

export default function Paciente() {
  const [descricao, setDescricao] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [idPaciente, setIdPaciente] = useState('');
  const [idConsulta, setIdConsulta] = useState('');
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/todo')
      .then(res => res.json())
      .then(data => setTarefas(data));
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    const novaTarefa = {
      descricao,
      data_conclusao: dataFinal,
      id_paciente: idPaciente,
      id_consulta: idConsulta
    };

    const response = await fetch('http://localhost:3001/todo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novaTarefa)
    });

    const data = await response.json();
    setTarefas([...tarefas, data]);

    setDescricao('');
    setDataFinal('');
    setIdPaciente('');
    setIdConsulta('');
  };

  return (
    <div className="container">
      <div className="todo-form">
        <h3>Criar Tarefa (To do)</h3>
        <form onSubmit={handleAddTask}>
          <textarea
            placeholder="Descrição da atividade"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
          <input
            type="date"
            value={dataFinal}
            onChange={(e) => setDataFinal(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="ID do paciente"
            value={idPaciente}
            onChange={(e) => setIdPaciente(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="ID da consulta"
            value={idConsulta}
            onChange={(e) => setIdConsulta(e.target.value)}
            required
          />
          <button type="submit">Adicionar Tarefa</button>
        </form>
      </div>

      <div className="lista-tarefas">
        <h3>Tarefas Criadas</h3>
        <ul>
          {tarefas.map((t) => (
            <li key={t.id_todo}>
              <strong>{t.descricao}</strong> <br />
              Paciente: {t.nome_paciente} | Estagiário: {t.nome_estagiario} <br />
              Prazo: {t.data_conclusao} | Concluído: {t.concluido ? 'Sim' : 'Não'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}