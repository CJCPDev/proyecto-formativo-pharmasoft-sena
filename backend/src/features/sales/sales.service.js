import { saleRepository } from "./sales.repository.js";

export const saleService = {

  async createSale(data) {
    return await saleRepository.createSale(data);
  },

  async getAll() {
    return await saleRepository.getAll();
  },

  async getSaleById(id) {
    return await saleRepository.getById(id);
  }

};