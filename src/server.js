const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/users.route");

module.exports = function server(port) {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use(userRoutes);

  app.listen(port, () => console.log("running on port:", port));
};
