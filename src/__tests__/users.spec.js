require("dotenv/config");
require("../database/connect");

const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  removeUser,
  authUser,
} = require("../models/users.model");

describe("Users model teste suite", () => {
  const userData = {
    cpf: "1234",
    password: "123",
    role: "ADMIN",
    token: "",
  };

  it("create user", async () => {
    const user = await createUser(userData);

    expect(user.cpf).toBe(userData.cpf);
  });

  it("auth user", async () => {
    userData.token = await authUser({
      cpf: userData.cpf,
      password: userData.password,
    });

    const decodedToken = await authUser({ token: userData.token });

    expect(decodedToken.role).toBe(userData.role);
  });

  it("get all users", async () => {
    const users = await getUsers();

    expect(users.length > 0).toBe(true);
  });

  it("get one user", async () => {
    const user = await getUser(userData.cpf);

    expect(user.role).toBe(userData.role);
  });

  it("update user", async () => {
    await updateUser(userData.cpf, { role: "SELLER" });

    const user = await getUser(userData.cpf);

    expect(user.role).toBe("SELLER");
  });

  it("remove user", async () => {
    await removeUser(userData.cpf);

    const user = await getUser(userData.cpf);

    expect(user).toBe(undefined);
  });
});
