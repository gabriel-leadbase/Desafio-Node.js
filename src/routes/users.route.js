const { Router } = require("express");

const authMiddleware = require("../common/middlewares/auth.middleware");
const {
  createUser,
  getUser,
  getUsers,
  updateUser,
  removeUser,
} = require("../controllers/users.controller");

const userRoutes = Router();

userRoutes.post("/user", createUser);
userRoutes.get("/user", authMiddleware, getUsers);
userRoutes.get("/user/:cpf", authMiddleware, getUser);
userRoutes.put("/user/:cpf", authMiddleware, updateUser);
userRoutes.delete("/user/:cpf", authMiddleware, removeUser);

module.exports = userRoutes;
