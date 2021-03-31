import express from "express";
import usersRoute from "./users";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("teste");
});

router.use("/users", usersRoute);

export default router;
