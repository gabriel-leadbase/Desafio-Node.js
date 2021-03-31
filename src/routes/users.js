import express from "express"
import UsersController from "../../src/controller/users"
import User from "../../src/models/user"

const router = express.Router()
const usersController = new UsersController(User)

router.get("/", (req, res) => {
  usersController.get(req, res)
})

router.get("/:id", (req, res) => {
  usersController.getById(req, res)
})

router.post("/", (req, res) => {
  usersController.createUser(req, res);
});

export default router;