CREATE TABLE usuario(
    id PRIMARY KEY integer,
    nome text NOT NULL,
    email text NOT NULL,
    senha text NOT NULL
);
CREATE TABLE admin(
    id PRIMARY KEY integer,
    senha text NOT NULL
);
CREATE TABLE noticias(
    id PRIMARY KEY integer,
    manchete text NOT NULL,
    data text NOT NULL,
    imagem blob NOT NULL,
    views integer,
    autor text NOT NULL
);
CREATE TABLE ongs(
    id PRIMARY KEY integer,
    nome text NOT NULL,
    link text NOT NULL,
    objetivo text NOT NULL,
    imagem blob NOT NULL
);
CREATE TABLE comentario(
    id PRIMARY KEY integer,
    data text NOT NULL,
    like integer,
    deslike integer,
    views integer
);
INSERT INTO noticias (data) VALUES (CURRENT_TIMESTAMP);
INSERT INTO comentario (data) VALUES (CURRENT_TIMESTAMP);