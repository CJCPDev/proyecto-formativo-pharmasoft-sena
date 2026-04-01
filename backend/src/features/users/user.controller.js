// src/features/users/user.controller.js
// src/features/users/user.controller.js


import { userService } from "./user.service.js";


export const userController = {
  async create(req, res) {


    console.log("BODY RECIBIDO:", req.body); // CLAVE


    try {
      const user = await userService.createUser(req.body);


      res.status(201).json({
        message: "Usuario creado correctamente",
        userId: user.id,
      });


    } catch (err) {
      console.error("ERROR BACKEND:", err);


      res.status(500).json({
        error: err.message,
      });
    }
  },
};
