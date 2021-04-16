const express = require("express");
const cors = require("cors");

module.exports = function server(port) {
  const app = express();

  app.use(cors());

  app.listen(port, () => console.log("running on port:", port));
};
