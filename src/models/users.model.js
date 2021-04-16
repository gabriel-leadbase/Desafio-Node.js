const { model } = require("mongoose");

const userSchema = require("../schemas/users.schema");

const User = model("User", userSchema);

async function createUser(userData) {
  const exists = await getUser(userData.cpf);

  if (!exists) {
    const user = new User(userData);

    await user.save();

    return user;
  }

  throw new Error("That user already exists!");
}

async function getUsers() {
  return await User.find();
}

async function getUser(cpf) {
  const users = await getUsers();

  for (const user of users) {
    if (user.cpf === cpf) {
      return user;
    }
  }

  return undefined;
}

async function updateUser(cpf, newData) {
  const user = await getUser(cpf);

  await user.updateOne({
    updatedAt: new Date().toLocaleString(),
    role: newData.role || user.role,
  });
}

async function removeUser(cpf) {
  const user = await getUser(cpf);

  await user.remove();
}

module.exports = { createUser, getUsers, getUser, updateUser, removeUser };
