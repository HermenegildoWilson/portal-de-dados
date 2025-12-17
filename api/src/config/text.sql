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

CREATE TABLE sensor_readings (
  id SERIAL PRIMARY KEY,
  sensor_id VARCHAR(50) NOT NULL,
  temperature REAL,
  humidity REAL,
  pressure REAL,
  altitude REAL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_sensor_time
ON sensor_readings (sensor_id, created_at DESC);
