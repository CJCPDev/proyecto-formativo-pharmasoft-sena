// src/config/db.js
import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";


dotenv.config();


export const pool = new Pool({
<<<<<<< HEAD
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  max: 10,
  idleTimeoutMillis: 30000,
=======
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    max: 10,
    idleTimeoutMillis: 30000,
>>>>>>> piloto_backend
});


pool.on("connect", () => {
<<<<<<< HEAD
  console.log("Conectado a PostgreSQL");
=======
    console.log("Conectado a PostgreSQL");
>>>>>>> piloto_backend
});


pool.on("error", (err) => {
<<<<<<< HEAD
  console.error("Error en la conexión con PostgreSQL", err);
=======
    console.error("Error en la conexión con PostgreSQL", err);
>>>>>>> piloto_backend
});
