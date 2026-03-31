// src/app.js
import express from "express";
import cors from "cors";
import productoRoutes from "./products/product.routes.js";


const app = express();


app.use(cors({ origin: "http://localhost:5173" })); // tu frontend Vite
app.use(express.json());


app.use("/api/products", productoRoutes);


export default app;
