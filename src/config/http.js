const express = require("express");

const app = express();

app.use(express.json());

const securityMiddleware = require("../middlewares/security.middleware");

app.use(
  securityMiddleware.unless({
    path: [{ url: "/login" }, { url: "/logout" }],
  })
);

module.exports = () => {
  require("../features/login/login.router")(app);
  return app;
};
