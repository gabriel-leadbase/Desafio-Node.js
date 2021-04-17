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

async function authUser(req, res) {
  try {
    const token = await userModel.authUser({
      cpf: req.body.cpf,
      password: req.body.password,
    });

    return res.status(202).json({
      log: "user autheticated",
      token,
    });
  } catch (err) {
    return res.status(202).json({
      log: "user authetication error",
      error: err.message,
    });
  }
}

async function getUser(req, res) {
  try {
    const user = await userModel.getUser(req.params.cpf);

    if (user === undefined) throw new Error("User not found!");

    return res.status(200).json({
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
  try {
    const users = await userModel.getUsers();

    return res.status(users.length > 0 ? 200 : 404).json({
      log: "users getted",
      users,
    });
  } catch (err) {
    return res.status(500).json({
      log: "error on users get",
      error: err.message,
    });
  }
}

async function updateUser(req, res) {
  try {
    await userModel.updateUser(req.params.cpf, req.body);

    return res.status(202).json({
      log: "user updated",
    });
  } catch (err) {
    return res.status(500).json({
      log: "error on user update",
      error: err.message,
    });
  }
}

async function removeUser(req, res) {
  try {
    await userModel.removeUser(req.params.cpf);

    return res.status(202).json({
      log: "user removed",
    });
  } catch (err) {
    return res.status(500).json({
      log: "error on user remove",
      error: err.message,
    });
  }
}

module.exports = {
  createUser,
  getUser,
  getUsers,
  updateUser,
  removeUser,
  authUser,
};
