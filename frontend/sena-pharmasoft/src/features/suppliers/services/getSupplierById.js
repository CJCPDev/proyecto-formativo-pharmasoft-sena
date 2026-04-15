import { suppliers } from "@/data/suppliers/suppliers.js";

export const getSupplierById = (id) => {
  return suppliers.find((supplier) => supplier.id == id);
};
