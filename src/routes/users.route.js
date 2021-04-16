const { Router } = require("express");

const { createUser } = require("../controllers/users.controller");

const userRoutes = Router();

userRoutes.post("/user", createUser);

module.exports = userRoutes;
