const { Router } = require("express");

const authMiddleware = require("../common/middlewares/auth.middleware");
const roleMiddleware = require("../common/middlewares/role.middleware");
const {
  createUser,
  getUser,
  getUsers,
  updateUser,
  removeUser,
} = require("../controllers/users.controller");

const userRoutes = Router();

userRoutes.post("/users", createUser);
userRoutes.get("/users", authMiddleware, roleMiddleware, getUsers);
userRoutes.get("/users/:cpf", authMiddleware, roleMiddleware, getUser);
userRoutes.put("/users/:cpf", authMiddleware, roleMiddleware, updateUser);
userRoutes.delete("/users/:cpf", authMiddleware, roleMiddleware, removeUser);

module.exports = userRoutes;
