const { Router } = require("express");

const { authUser } = require("../controllers/users.controller");

const authRoutes = Router();

authRoutes.post("/auth", authUser);

module.exports = authRoutes;
