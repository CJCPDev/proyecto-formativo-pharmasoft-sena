import { userService } from "./user.service.js";


export const userController = {
  async create(req, res) {
    console.log("BODY RECIBIDO:", req.body);

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

  // ✅ NUEVO MÉTODO (LISTAR USUARIOS)
async getAll(req, res) {
  try {
    const users = await userService.getAllUsers();


    res.json(users);
  } catch (error) {
    console.error("🔥 ERROR BACKEND:", error);
    res.status(500).json({ error: error.message });
  }
},
  async getById(req, res) {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

};
