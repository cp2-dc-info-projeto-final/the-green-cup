DROP TABLE IF EXISTS suario;

CREATE TABLE usuari (
    id bigint GENERATED ALWAYS AS IDENTITY,
    login text NOT NULL,
    email text NOT NULL
);

INSERT INTO usuar (login, email) VALUES
('hermenegildo', 'hermenegildo@email.com'),
('zoroastra', 'zoroastra@email.com');
