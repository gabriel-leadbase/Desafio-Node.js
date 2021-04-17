const { model } = require("mongoose");
const sha256 = require("sha256");

const userSchema = require("../schemas/users.schema");
const { sign, verify } = require("../shared/jwt");

const passAlt = process.env.PASS_ALT;
const User = model("User", userSchema);

async function createUser({ cpf, password, role, permissions }) {
  const exists = await getUser(cpf);

  if (!exists) {
    const user = new User({
      cpf,
      role,
      permissions,
      password: sha256.x2(password + passAlt),
    });

    await user.save();

    return user;
  }

  throw new Error("That user already exists!");
}

async function authUser({ cpf, password, token }) {
  if (!token) {
    const user = await getUser(cpf);

    if (
      user !== undefined &&
      cpf === user.cpf &&
      sha256.x2(password + passAlt) === user.password
    ) {
      return sign({
        cpf: user.cpf,
        role: user.role,
        permissions: user.permissions,
      });
    }

    throw new Error("Incorrect credentials!");
  }

  return verify(token);
}

async function getUsers() {
  return await User.find();
}

async function getUser(cpf) {
  const users = await getUsers();

  if (users.length > 0) {
    for (const user of users) {
      if (user.cpf === cpf) {
        return user;
      }
    }
  }

  return undefined;
}

async function updateUser(cpf, newData) {
  const user = await getUser(cpf);

  if (user !== undefined) {
    await user.updateOne({
      updatedAt: new Date().toLocaleString(),
      role: newData.role || user.role,
      password: newData.password
        ? sha256.x2(newData.password + passAlt)
        : user.password,
      permissions: newData.permissions
        ? [
            // remove user permissions
            ...user.permissions.filter(
              (permission) => !newData.permissions.includes(permission),
            ),
            // add user permissions
            ...newData.permissions.filter(
              (permission) => !user.permissions.includes(permission),
            ),
          ]
        : user.permissions,
    });

    return;
  }

  throw new Error("User doesn't exists!");
}

async function removeUser(cpf) {
  const user = await getUser(cpf);

  if (user !== undefined) {
    await user.remove();

    return;
  }

  throw new Error("User doesn't exists!");
}

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  removeUser,
  authUser,
};
