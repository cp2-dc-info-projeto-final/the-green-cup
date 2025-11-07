-- Active: 1752941682995@@127.0.0.1@5432@postgres
DROP TABLE IF EXISTS noticias;
DROP TABLE IF EXISTS ongs;
DROP TABLE IF EXISTS comentario;
DROP TABLE IF EXISTS usuario;
CREATE TABLE usuario (
    id bigint GENERATED ALWAYS AS IDENTITY,
    nome text NOT NULL,
    email text NOT NULL,
    senha text NOT NULL,
    role text NOT NULL DEFAULT 'user',

    
    -- Constraints
    CONSTRAINT pk_usuario PRIMARY KEY (id),
    CONSTRAINT uk_usuario_nome UNIQUE (nome), -- unicidade
    CONSTRAINT uk_usuario_email UNIQUE (email), -- unicidade
    CONSTRAINT ck_usuario_nome_length CHECK (length(nome) >= 3 AND length(nome) <= 50), -- comprimento
    CONSTRAINT ck_usuario_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'), -- formato de email com expressão regular
    CONSTRAINT ck_usuario_senha_length CHECK (length(senha) >= 6), -- comprimento mínimo
    CONSTRAINT ck_usuario_role_valid CHECK (role IN ('admin', 'user')) -- tipos de usuário
);

INSERT INTO usuario (nome, email, senha, role) VALUES
-- senha efelantinho
('hermenegildo', 'hermenegildo@email.com', '$2a$12$f2c.uHGHS4drfaz6HR870OLamkarD57kI.gkr4//Vbbp0vN9IrFfG', 'admin'),
('zoroastra', 'zoroastra@email.com', '$2a$12$f2c.uHGHS4drfaz6HR870OLamkarD57kI.gkr4//Vbbp0vN9IrFfG', 'user');

-- demais tabelas

CREATE TABLE ongs(
    id bigint GENERATED ALWAYS AS IDENTITY,
    nome text NOT NULL,
    link text NOT NULL,
    objetivo text NOT NULL,
    img text NOT NULL,

    CONSTRAINT pk_ongs PRIMARY KEY (id)
);
CREATE TABLE comentario(
    id bigint GENERATED ALWAYS AS IDENTITY,
    id_usuario integer NOT NULL,
    data DATE NOT NULL,
    likes bigint,
    deslike bigint,
    texto text NOT NULL,
    criacao TIMESTAMP DEFAULT NOW(),
    atualizacao TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id),

    CONSTRAINT pk_comentario PRIMARY KEY (id)
);
CREATE TABLE noticias(
    id bigint GENERATED ALWAYS AS IDENTITY,
    id_comentario integer,
    manchete text NOT NULL,
    data text NOT NULL,
    criacao TIMESTAMP DEFAULT NOW(),
    atualizacao TIMESTAMP DEFAULT NOW(),
    img text NOT NULL,
    views bigint,
    autor text NOT NULL,
    FOREIGN KEY (id_comentario) REFERENCES comentario(id),

    CONSTRAINT pk_noticias PRIMARY KEY (id)
);