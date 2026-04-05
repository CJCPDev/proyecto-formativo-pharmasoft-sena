// src/features/users/user.service.js
import { userRepository } from "./user.repository.js";

export const userService = {
  async createUser(data) {
    return await userRepository.create(data);
  },

  // ✅ AGREGADO (esto faltaba)
  async getAllUsers() {
    return await userRepository.getAll();
  },

  async getUserById(id) {
  return await userRepository.getById(id);
},
};