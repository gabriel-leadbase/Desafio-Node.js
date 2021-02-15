const express = require("express");

const app = express();

app.use(express.json());

module.exports = () => {
  require("../features/login/login.router")(app);
  return app;
};
