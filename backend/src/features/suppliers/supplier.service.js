import { supplierRepository } from "./supplier.repository.js";


export const supplierService = {
  async createSupplier(data) {
    return await supplierRepository.create(data);
  },
    async getAll() {
    return await supplierRepository.getAll();
  },
};