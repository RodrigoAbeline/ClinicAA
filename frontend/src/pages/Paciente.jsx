import React, { useState, useEffect } from "react";
import "./paciente.css";

export default function Paciente() {
  const [descricao, setDescricao] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [idPaciente, setIdPaciente] = useState('');
  const [idConsulta, setIdConsulta] = useState('');
  const [tarefas, setTarefas] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/todo')
      .then(res => {
        if (!res.ok) {
          throw new Error("Erro ao buscar tarefas");
        }
        return res.json();
      })
      .then(data => {
        // garante que seja array
        if (Array.isArray(data)) {
          setTarefas(data);
        } else {
          setTarefas([]);
          setErro("Resposta inválida da API");
        }
      })
      .catch(err => {
        console.error(err);
        setErro("Não foi possível carregar as tarefas");
        setTarefas([]);
      });
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    const novaTarefa = {
      descricao,
      data_conclusao: dataFinal,
      id_paciente: idPaciente,
      id_consulta: idConsulta
    };

    try {
      const response = await fetch('http://localhost:3001/todo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaTarefa)
      });

      if (!response.ok) {
        throw new Error("Erro ao inserir tarefa");
      }

      const data = await response.json();
      setTarefas(prev => [...prev, data]);

      setDescricao('');
      setDataFinal('');
      setIdPaciente('');
      setIdConsulta('');
    } catch (err) {
      console.error(err);
      setErro("Não foi possível adicionar a tarefa");
    }
  };

  return (
    <div className="container">
      {/* Lista de tarefas */}
      <div className="lista-tarefas">
        <h3>Tarefas do Paciente</h3>
        {erro && <p style={{color: "red"}}>{erro}</p>}
        <ul>
          {Array.isArray(tarefas) && tarefas.map((t) => (
            <li key={t.id_todo}>
              <strong>{t.descricao}</strong> <br />
              Paciente: {t.nome_paciente} | Estagiário: {t.nome_estagiario} <br />
              Prazo: {t.data_conclusao} <br />
              
              <label>
                <input
                  type="checkbox"
                  checked={t.concluido}
                  readOnly
                />
                {t.concluido ? " Concluída" : " Pendente"}
              </label>
            </li>
          ))}
        </ul>
      </div>

      
      <div className="proximas-consultas">
        <h3>Próximas Consultas</h3>
        <div className="consulta-campo">
          <label>Data:</label>
          <input type="date" />
        </div>
        <div className="consulta-campo">
          <label>Horário:</label>
          <input type="time" />
        </div>
      </div>
    </div>
  );
}
