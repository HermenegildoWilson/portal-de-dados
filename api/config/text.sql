create database plataforma;
\c plataforma

CREATE TABLE usuario (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100),
  role VARCHAR(40),
  email VARCHAR(150),
  senha varchar(1000),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table tokens(
    id SERIAL PRIMARY KEY,
    id_usuario integer references usuario(id),
    refresh_token text,

    foreign key (id_usuario) references usuario(id)
);

CREATE TABLE dados (
    id SERIAL PRIMARY KEY,
    temperature FLOAT,
    humidity FLOAT,
    pressure FLOAT,
    altitude FLOAT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);