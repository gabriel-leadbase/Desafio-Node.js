require("dotenv/config");

const { sign, verify } = require("../shared/jwt");

describe("JWT tests suite", () => {
  let token;

  const payload = {
    data: "meow"
  };

  test("sign token", () => {
    token = sign(payload);

    expect(typeof token).toBe("string");
  });

  test("verify and decode token", () => {
    const decodedToken = verify(token);

    expect(decodedToken.data).toBe(payload.data);
  });
});
