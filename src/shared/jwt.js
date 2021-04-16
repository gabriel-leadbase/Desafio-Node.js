const jwt = require("jsonwebtoken");

const privateKey = process.env.JWT_PK;

function sign(payload) {
  return jwt.sign(payload, privateKey, {
    algorithm: "HS256",
    expiresIn: "24h",
  });
}

function verify(token) {
  try {
    return jwt.verify(token, privateKey);
  } catch (err) {
    throw new Error("Invalid token!");
  }
}

module.exports = { sign, verify };
