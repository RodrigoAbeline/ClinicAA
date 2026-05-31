import React, { useState } from 'react';


export default function Profissional() {

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');

  // cálculo correto da idade
  const calcularIdade = (data) => {
    const hoje = new Date();
    const nascimento = new Date(data);

    let idade = hoje.getFullYear() - nascimento.getFullYear();

    const mes = hoje.getMonth() - nascimento.getMonth();

    if (
      mes < 0 ||
      (mes === 0 && hoje.getDate() < nascimento.getDate())
    ) {
      idade--;
    }

    return idade;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const paciente = {
      nome_paciente: nome,
      cpf: cpf,
      contato_paciente: telefone,
      idade: calcularIdade(dataNascimento),
      login_usuario: email,
      senha_usuario: senha
    };

    try {

      const response = await fetch('http://localhost:3001/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paciente)
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        alert('Paciente cadastrado com sucesso!');

        // limpa formulário
        setNome('');
        setCpf('');
        setEmail('');
        setDataNascimento('');
        setTelefone('');
        setSenha('');
      } else {
        alert('Erro ao cadastrar');
      }

    } catch (error) {
      console.error(error);
      alert('Erro no servidor');
    }
  };

  return (
    <div>

      <h2>Cadastro</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Digite o nome"
          className="nomeinp"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Digite o CPF"
          className="cpfinp"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Digite o Email"
          className="emailinp"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="date"
          className="datainp"
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Digite o telefone"
          className="inttell"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Digite a senha"
          className="senhainp"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <button type="submit">
          Cadastrar
        </button>

      </form>

    </div>
  );
}