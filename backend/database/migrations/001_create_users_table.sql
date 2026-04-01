CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    document_type VARCHAR(50) NOT NULL,
    document_number VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    user_email VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    phone_adicional VARCHAR(20),
    user_group VARCHAR(50) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    fecha_inicio DATE,
    fecha_fin DATE,
    created_at TIMESTAMP DEFAULT NOW()
);