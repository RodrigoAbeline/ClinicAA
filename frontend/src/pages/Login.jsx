import React, { useState } from "react";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login_usuario: email, senha_usuario: senha })
      });

      const data = await response.json();

      if (response.ok) {
        alert(`✅ Login realizado com sucesso!\nTipo: ${data.tipo}\nNome: ${data.dados.nome_paciente || data.dados.nome_estagiario || email}`);
      } else {
        alert(`❌ Erro: ${data.error}`);
      }
    } catch (error) {
      alert(`❌ Erro inesperado: ${error.message}`);
    }

    setEmail("");
    setSenha("");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input 
              type="password" 
              value={senha} 
              onChange={(e) => setSenha(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn-login">Entrar</button>
        </form>
        <p className="login-footer">Esqueceu a senha? <a href="#">Recuperar</a></p>
      </div>
    </div>
  );
}

