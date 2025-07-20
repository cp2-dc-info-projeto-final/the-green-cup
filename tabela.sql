DROP TABLE IF EXISTS usuario;
CREATE TABLE usuario(
    id integer PRIMARY KEY NOT NULL AUTOINCREMENT,
    email text,
    login text NOT NULL
);

INSERT INTO usuario (login, email) VALUES
('a', 'a@email.com'),
('zoroastra', 'zoroastra@email.com');
