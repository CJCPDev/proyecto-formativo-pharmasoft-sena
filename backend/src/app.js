import express from "express";
import cors from "cors";
import productRoutes from "./features/products/product.routes.js"; 
import salesRoutes from "./features/sales/sales.routes.js"; 
import userRoutes from "./features/users/user.routes.js"; // ✅ agregado

const app = express();

app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"] }));
app.use(express.json());


app.use("/api/users", userRoutes);
app.use("/api/productos", productRoutes);
app.use("/api/sale", salesRoutes);

export default app;