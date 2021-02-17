const express = require("express");

const app = express();

app.use(express.json());

app.use(
  require("cors")({
    exposedHeaders: ["x-access-token"],
  })
);

const securityMiddleware = require("../middlewares/security.middleware");

app.use(
  securityMiddleware.unless({
    path: [{ url: "/login" }],
  })
);

module.exports = () => {
  require("../features/login/login.router")(app);
  require("../features/user/user.router")(app);
  return app;
};
