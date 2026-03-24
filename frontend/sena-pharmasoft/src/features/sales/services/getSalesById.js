import { ventas } from "../../../data/sells/sells"

export const getSalesById = (id) => {
    return ventas.find(sale => sale.id == id);
}