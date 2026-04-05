CREATE TABLE IF NOT EXISTS productos (
    id SERIAL PRIMARY KEY,
    nombreMedicamento VARCHAR(100) NOT NULL,
    lote VARCHAR(50) NOT NULL,
    forma_farmaceutica VARCHAR(50) NOT NULL,
    fecha_fabricacion DATE NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    via_administracion VARCHAR(50) NOT NULL,
    laboratorio VARCHAR(50) NOT NULL,
    concentracion VARCHAR(50) NOT NULL,
    proveedor VARCHAR(50) NOT NULL,
    stock INT NOT NULL,
    precio_costo DECIMAL(10,2) NOT NULL,
    precio_venta DECIMAL(10,2) NOT NULL,
    requiere_formula BOOLEAN NOT NULL,
    estado VARCHAR(50) NOT NULL,
    descripcion TEXT,
    fecha_creacion TIMESTAMP DEFAULT NOW()
);
