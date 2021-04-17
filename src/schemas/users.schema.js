const { Schema } = require("mongoose");

module.exports = new Schema({
  cpf: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  permissions: { type: [String] },
  createdAt: { type: Date, default: new Date().toLocaleString() },
  updatedAt: { type: Date, default: new Date().toLocaleString() },
});
