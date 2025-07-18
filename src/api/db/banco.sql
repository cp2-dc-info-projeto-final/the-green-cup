CREATE TABLE usuario(
    id integer PRIMARY KEY,
    nome text NOT NULL,
    email text NOT NULL,
    senha text NOT NULL
);
CREATE TABLE admin(
    id integer PRIMARY KEY,
    senha text NOT NULL
);
CREATE TABLE noticias(
    id integer PRIMARY KEY,
    id_comentario FOREIGN KEY REFERENCES comentario(id),
    manchete text NOT NULL,
    data text NOT NULL,
    imagem blob NOT NULL,
    views integer,
    autor text NOT NULL
);
CREATE TABLE ongs(
    id integer PRIMARY KEY,
    nome text NOT NULL,
    link text NOT NULL,
    objetivo text NOT NULL,
    imagem blob NOT NULL
);
CREATE TABLE comentario(
    id integer PRIMARY KEY,
    id_usuario integer FOREIGN KEY REFERENCES usuario(id),
    data text NOT NULL,
    like integer,
    deslike integer,
    texto text NOT NULL
);
INSERT INTO noticias (data) VALUES (CURRENT_TIMESTAMP);
INSERT INTO comentario (data) VALUES (CURRENT_TIMESTAMP);