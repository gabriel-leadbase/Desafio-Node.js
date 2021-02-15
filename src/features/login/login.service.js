const mongoose = require("mongoose");
const Users = mongoose.model("users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const createUser = async (body) => {
  return bcrypt.hash(body.password, saltRounds, (err, hash) => {
    return Users.create({
      name: body.name,
      cpf: body.cpf,
      password: hash,
    });
  });
};

const login = async (body) => {
  const user = await Users.findOne({ cpf: body.login });
  if (!user) return ["User not found!", null];
  const tokenData = {
    name: user.name,
    cpf: user.cpf,
    role: user.role,
    permissions: user.permissions,
  };
  const token = jwt.sign(tokenData, "desafio-node", {
    expiresIn: 300, // expires in 5min
  });
  const validPassword = await bcrypt.compare(body.password, user.password);
  if (validPassword == true) {
    return [null, token];
  } else {
    return ["Incorrect login or password!", null];
  }
};

const getUsers = async () => Users.find({});

module.exports = {
  createUser,
  login,
  getUsers,
};
