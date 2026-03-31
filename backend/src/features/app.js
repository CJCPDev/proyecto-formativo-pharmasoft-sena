import express from "express";
import cors from "cors";
import productRoutes from "./products/product.routes.js"; // ✅ sin "features/"

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/products", productRoutes);

export default app;