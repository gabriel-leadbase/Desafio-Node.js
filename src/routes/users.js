import express from "express"
import UsersController from "../../src/controller/users"
import User from "../../src/models/user"
import AuthUser from "../services/auth"

const router = express.Router()
const usersController = new UsersController(User, AuthUser)

router.get("/", (req, res) => {
  usersController.get(req, res)
})

router.get("/:id", (req, res) => {
  usersController.getById(req, res)
})

router.post("/", (req, res) => {
  console.log(req.body)
  usersController.createUser(req, res);
});

router.put("/:id", (req, res) => {
  usersController.updateUser(req, res);
});

router.delete("/", (req, res) => {
  usersController.deleteAll(req, res);
});

router.delete("/:id", (req, res) => {
  usersController.deleteById(req, res);
});

router.post("/authenticate", (req, res) => {
  usersController.authenticateUser(req, res);
});

export default router;