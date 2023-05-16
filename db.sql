-- Postgresql DB
-- Crear la tabla users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  fullname VARCHAR(60) NOT NULL,
  username VARCHAR(30) NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Crear la tabla tasks
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(40) NOT NULL,
  description TEXT,
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);