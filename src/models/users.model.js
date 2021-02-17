const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    cpf: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["administrador", "vendedor"],
      default: "vendedor",
    },
    permissions: [],
  },
  { autoCreate: true }
);

schema.set("toJSON", { virtuals: true });
schema.set("toObject", { virtuals: true });
schema.set("timestamps", { createdAt: "created_at", updatedAt: "updated_at" });

module.exports = mongoose.model("users", schema);
