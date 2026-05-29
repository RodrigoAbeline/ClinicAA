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

export default App; 