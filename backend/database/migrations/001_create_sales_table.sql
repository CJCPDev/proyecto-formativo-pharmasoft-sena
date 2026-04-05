CREATE TABLE IF NOT EXISTS sales (
    id SERIAL PRIMARY KEY,
    numeroFactura INT GENERATED ALWAYS AS IDENTITY,
    fechaHora DATE, 
    usuario VARCHAR NOT NULL,
    farmaceuta VARCHAR NOT NULL,
    sell_state VARCHAR(50) NOT NULL,
    payment_state VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);