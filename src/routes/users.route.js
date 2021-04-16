const { Router } = require("express");

const {
  createUser,
  getUser,
  getUsers,
  updateUser,
  removeUser,
} = require("../controllers/users.controller");

const userRoutes = Router();

userRoutes.post("/user", createUser);
userRoutes.get("/user", getUsers);
userRoutes.get("/user/:cpf", getUser);
userRoutes.put("/user/:cpf", updateUser);
userRoutes.delete("/user/:cpf", removeUser);

module.exports = userRoutes;
