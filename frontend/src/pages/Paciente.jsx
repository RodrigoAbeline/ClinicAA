import React, { useState } from "react";
import "./paciente.css";

function App() {
  const [tasks, setTasks] = useState([
    { text: "Estudar React", done: false },
    { text: "Praticar CSS", done: false },
    { text: "Ler um artigo técnico", done: false },
  ]);

  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="app">
      <h1>Tarefas</h1>
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            className={task.done ? "done" : ""}
            onClick={() => toggleTask(index)}
          >
            {task.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
import React, { useState, useEffect } from 'react';

export default function Estagiario() {
  const [titulo, setTitulo] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [descricao, setDescricao] = useState('');
  const [paciente, setPaciente] = useState('');
  const [estagiario, setEstagiario] = useState('');
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/todo')
      .then(res => res.json())
      .then(data => setTarefas(data));
  }, []);

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

    setTitulo('');
    setDataFinal('');
    setDescricao('');
    setPaciente('');
    setEstagiario('');
  };

  return (
    <div className="container">
      <div className="todo-form">
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
export default App; 