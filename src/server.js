const express = require("express");
const cors = require("cors");

module.exports = function server(port, routers) {
  const app = express();

  app.use(cors());
  app.use(express.json());

  for (const router of routers) {
    app.use(router);
  }

  app.listen(port, () => console.log("running on port:", port));
};
