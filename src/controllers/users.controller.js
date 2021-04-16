const userModel = require("../models/users.model");

async function createUser(req, res) {
  try {
    const user = await userModel.createUser(req.body);

    return res.status(201).json({
      log: "created new user",
      user,
    });
  } catch (err) {
    return res.status(500).json({
      log: "error on user creation",
      error: err.message,
    });
  }
}

async function getUser(req, res) {
  try {
    const { cpf } = req.params;
    const user = await userModel.getUser(cpf);

    if (user === undefined) throw new Error("User not found!");

    return res.status(201).json({
      log: "user getted",
      user,
    });
  } catch (err) {
    return res.status(404).json({
      log: "error on user get",
      error: err.message,
    });
  }
}

async function getUsers(req, res) {
  const users = await userModel.getUsers();

  return res.status(201).json({
    log: "users getted",
    users,
  });
}

module.exports = { createUser, getUser, getUsers };
