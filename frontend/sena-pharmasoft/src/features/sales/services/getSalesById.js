import { ventas } from "../../../data/sells/sells.js"

export const getSalesById = (id) => {
    return ventas.find(sale => sale.id == id);
}