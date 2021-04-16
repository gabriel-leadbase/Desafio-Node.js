require("dotenv/config");
require("../database/connect");

const { createUser } = require("../models/users.model");

describe("Users model teste suite", () => {
  const userData = {
    cpf: "123",
    password: "123",
    role: "ADMIN",
  };

  it("create user", async () => {
    const user = await createUser(userData);

    expect(user.cpf).toBe(userData.cpf);
  });
});
