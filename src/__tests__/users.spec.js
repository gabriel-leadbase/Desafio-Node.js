require("dotenv/config");
require("../database/connect");

const {
  createUser,
  getUsers,
  getUser,
  updateUser,
} = require("../models/users.model");

describe("Users model teste suite", () => {
  const userData = {
    cpf: "1234",
    password: "123",
    role: "ADMIN",
  };

  it("create user", async () => {
    const user = await createUser(userData);

    expect(user.cpf).toBe(userData.cpf);
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
});
