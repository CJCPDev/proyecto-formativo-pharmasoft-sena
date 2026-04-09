CREATE TABLE IF NOT EXISTS suppliers (
    id SERIAL PRIMARY KEY,
    nit VARCHAR(50) NOT NULL UNIQUE,
    nombre VARCHAR(100),
    razon_social VARCHAR(100) UNIQUE NOT NULL,
    direccion VARCHAR(100),
    correo VARCHAR(100) UNIQUE NOT NULL,
    tel_contacto VARCHAR(10) NOT NULL,
    estado BOOLEAN NOT NULL DEFAULT TRUE,
    ciudad VARCHAR(50) NOT NULL,
    nombre_contacto VARCHAR(100) NOT NULL
);