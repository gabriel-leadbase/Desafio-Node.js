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

userRoutes.post("/user", createUser);
userRoutes.get("/user", authMiddleware, roleMiddleware, getUsers);
userRoutes.get("/user/:cpf", authMiddleware, roleMiddleware, getUser);
userRoutes.put("/user/:cpf", authMiddleware, roleMiddleware, updateUser);
userRoutes.delete("/user/:cpf", authMiddleware, roleMiddleware, removeUser);

module.exports = userRoutes;
