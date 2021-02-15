const JWT = require("jsonwebtoken");

const return401 = (res) => {
  return res.status(401).json({
    success: false,
    message: "Invalid or missing token",
  });
};

const jwtMiddleware = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) return return401(res);

  const jwtDecoded = JWT.decode(token);

  if (!jwtDecoded) return return401(res);

  const role = jwtDecoded.role.toString();
  if (role === "vendedor")
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });

  return next();
};

jwtMiddleware.unless = require("express-unless");

module.exports = jwtMiddleware;
