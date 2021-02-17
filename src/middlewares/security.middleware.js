const JWT = require("jsonwebtoken");

const return401 = (res, statusCode, message) => {
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};

const jwtMiddleware = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) return return401(res, 401, "Invalid or missing token");

  const jwtDecoded = JWT.decode(token);

  if (!jwtDecoded) return return401(res, 401, "Invalid or missing token");

  const role = jwtDecoded.role.toString();

  if (role === "administrador") return next();

  return return401(res, 403, "Unauthorized");
};

jwtMiddleware.unless = require("express-unless");

module.exports = jwtMiddleware;
