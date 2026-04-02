// src/features/suppliers/supplier.service.js
import { supplierRepository } from "./supplier.repository.js";


export const supplierService = {
  async createSupplier(data) {
    return await supplierRepository.create(data);
  },
};
