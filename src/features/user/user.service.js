const mongoose = require("mongoose");
const Users = mongoose.model("users");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const createUser = async (body) => {
  try {
    return [
      null,
      bcrypt.hash(body.password, saltRounds, (err, hash) => {
        return Users.create({
          name: body.name,
          cpf: body.cpf,
          password: hash,
          role: body.role || "vendedor",
          permissions: body.permissions || [],
        });
      }),
    ];
  } catch (error) {
    return [error, null];
  }
};

const getUsers = async () => [null, await Users.find({})];

const addPermissions = async (body, token) => {
  if (!body && !body.permission) return [true, null];
  let userData = await Users.findById(body.id);
  const permissionsToAdd = [
    ...new Set([...userData.permissions, body.permission]),
  ];
  return [
    null,
    await Users.findByIdAndUpdate(
      { _id: body.id },
      { permissions: permissionsToAdd },
      { new: true }
    ),
  ];
};

const removePermissions = async (body) => {
  if (!body && !body.permission) return [true, null];
  let userData = await Users.findById(body.id);
  const removeItem = userData.permissions.filter(
    (item) => item !== body.permission
  );
  return [
    null,
    await Users.findByIdAndUpdate(
      { _id: body.id },
      { permissions: removeItem },
      { new: true }
    ),
  ];
};

module.exports = {
  createUser,
  getUsers,
  addPermissions,
  removePermissions,
};
