use clinica;

CREATE TABLE Login (
    id_login INT PRIMARY KEY AUTO_INCREMENT,
    login_usuario VARCHAR(50) NOT NULL,
    senha_usuario VARCHAR(50) NOT NULL
);

CREATE TABLE Paciente (
    id_paciente INT PRIMARY KEY AUTO_INCREMENT,
    id_login INT,
    nome_paciente VARCHAR(50) NOT NULL,
    idade INT,
    cpf VARCHAR(11) UNIQUE,
    contato_paciente VARCHAR(16),
    descricao_paciente TEXT,
    relatorio_consulta TEXT,
    FOREIGN KEY (id_login) REFERENCES Login(id_login)
);

CREATE TABLE Acompanhante (
    id_acompanhante INT PRIMARY KEY AUTO_INCREMENT,
    id_paciente INT,
    id_login INT,
    nome_acompanhante VARCHAR(50),
    idade INT,
    contato_acompanhante VARCHAR(16),
    FOREIGN KEY (id_paciente) REFERENCES Paciente(id_paciente),
    FOREIGN KEY (id_login) REFERENCES Login(id_login)
);

CREATE TABLE Estagiario (
    id_estagiario INT PRIMARY KEY AUTO_INCREMENT,
    id_login INT,
    nome_estagiario VARCHAR(50),
    tempo_estagio VARCHAR(20),
    ativo BOOLEAN,
    FOREIGN KEY (id_login) REFERENCES Login(id_login)
);

CREATE TABLE Professor (
    id_professor INT PRIMARY KEY AUTO_INCREMENT,
    id_login INT,
    nome_professor VARCHAR(50),
    FOREIGN KEY (id_login) REFERENCES Login(id_login)
);

CREATE TABLE Local (
    id_local INT PRIMARY KEY AUTO_INCREMENT,
    nome_local VARCHAR(50)
);

CREATE TABLE Consulta (
    id_consulta INT PRIMARY KEY AUTO_INCREMENT,
    id_paciente INT,
    id_estagiario INT,
    id_professor INT,
    descricao_paciente TEXT,
    diagnostico_paciente TEXT,
    prescricao TEXT,
    relatorio_consulta TEXT,
    FOREIGN KEY (id_paciente) REFERENCES Paciente(id_paciente),
    FOREIGN KEY (id_estagiario) REFERENCES Estagiario(id_estagiario),
    FOREIGN KEY (id_professor) REFERENCES Professor(id_professor)
);

CREATE TABLE Agendamento (
    id_agendamento INT PRIMARY KEY AUTO_INCREMENT,
    id_paciente INT,
    id_estagiario INT,
    id_local INT,
    data DATE,
    hora TIME,
    FOREIGN KEY (id_paciente) REFERENCES Paciente(id_paciente),
    FOREIGN KEY (id_estagiario) REFERENCES Estagiario(id_estagiario),
    FOREIGN KEY (id_local) REFERENCES Local(id_local)
);

CREATE TABLE To_do (
    id_todo INT PRIMARY KEY AUTO_INCREMENT,
    id_paciente INT,
    id_consulta INT,
    descricao TEXT,
    data_conclusao DATE,
    concluido BOOLEAN,
    FOREIGN KEY (id_paciente) REFERENCES Paciente(id_paciente),
    FOREIGN KEY (id_consulta) REFERENCES Consulta(id_consulta)
);