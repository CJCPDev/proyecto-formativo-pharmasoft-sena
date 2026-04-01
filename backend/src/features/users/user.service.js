// src/features/users/user.service.js
import { userRepository } from "./user.repository.js";


export const userService = {
  async createUser(data) {
    return await userRepository.create(data);
  },
};
