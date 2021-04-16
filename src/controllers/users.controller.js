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

module.exports = { createUser };
