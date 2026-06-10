import React, { useState, useEffect } from "react";
import "./paciente.css";

export default function Paciente() {
  const [tarefas, setTarefas] = useState([]);
  const [consultas, setConsultas] = useState([]);
  const [erro, setErro] = useState(null);

  // Carregar tarefas
useEffect(() => {
  fetch("http://localhost:3001/todo")
    .then(res => {
      if (!res.ok) throw new Error("Erro ao buscar tarefas");
      return res.json();
    })
    .then(data => Array.isArray(data) ? setTarefas(data) : setTarefas([]))
    .catch(err => {
      console.error(err);
      setErro("Não foi possível carregar as tarefas");
    });
}, []);

// Carregar consultas
useEffect(() => {
  fetch("http://localhost:3001/paciente/consultas")
    .then(res => {
      if (!res.ok) throw new Error("Erro ao buscar consultas");
      return res.json();
    })
    .then(data => Array.isArray(data) ? setConsultas(data) : setConsultas([]))
    .catch(err => {
      console.error(err);
      setErro("Não foi possível carregar as consultas");
    });
}, []);


  return (
    <div className="container">
      {/* Lista de tarefas */}
      <div className="lista-tarefas">
        <h3>Tarefas do Paciente</h3>
        {erro && <p style={{ color: "red" }}>{erro}</p>}
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

      {/* Próximas Consultas */}
      <div className="proximas-consultas">
        <h3>Próximas Consultas</h3>
        <ul>
          {consultas.map((c) => (
            <li key={c.id_consulta}>
              <strong>Paciente:</strong> {c.nome_paciente} <br />
              <strong>Estagiário:</strong> {c.nome_estagiario} <br />
              <strong>Data:</strong> {c.data_consulta} <br />
              <strong>Horário:</strong> {c.hora_consulta}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}