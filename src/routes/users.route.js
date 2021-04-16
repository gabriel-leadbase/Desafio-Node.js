const { Router } = require("express");

const {
  createUser,
  getUser,
  getUsers,
} = require("../controllers/users.controller");

const userRoutes = Router();

userRoutes.post("/user", createUser);
userRoutes.get("/user", getUsers);
userRoutes.get("/user/:cpf", getUser);

module.exports = userRoutes;
