const { authUser } = require("../../models/users.model");

async function authMiddleware(req, res, next) {
  try {
    await authUser({ token: req.headers.authorization.split(" ")[1] });

    next();
  } catch (err) {
    return res.status(500).json({
      log: "error on auth",
      error: err.message,
    });
  }
}

module.exports = authMiddleware;
