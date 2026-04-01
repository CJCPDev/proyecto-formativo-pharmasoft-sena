CREATE TABLE IF NOT EXISTS productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    lote VARCHAR(50) NOT NULL,
    forma_farmaceutica INT REFERENCES formas_farmaceuticas(id),
    fecha_fabricacion DATE NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    via_administracion INT REFERENCES vias_administracion(id),
    laboratorio INT REFERENCES laboratorios(id),
    concentracion VARCHAR(50) NOT NULL,
    proveedor INT REFERENCES proveedores(id),
    stock INT NOT NULL,
    precio_costo DECIMAL(10,2) NOT NULL,
    precio_venta DECIMAL(10,2) NOT NULL,
    requiere_formula BOOLEAN NOT NULL,
    estado INT REFERENCES estados(id),
    descripcion TEXT,
    fecha_creacion TIMESTAMP DEFAULT NOW()
);
