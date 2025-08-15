-- Active: 1752941682995@@127.0.0.1@5432@postgres
DROP TABLE IF EXISTS usuario;
CREATE TABLE usuario(
    id integer PRIMARY KEY generated always as identity,
    email text,
    login text NOT NULL
);

INSERT INTO usuario (login, email) VALUES
('a', 'a@email.com'),
('zoroastra', 'zoroastra@email.com');
