import React, { useState } from "react";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Login realizado com:\nEmail: ${email}\nSenha: ${senha}`);
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
