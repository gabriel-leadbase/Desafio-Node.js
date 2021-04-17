const { authUser } = require("../../models/users.model");

async function roleMiddleware(req, res, next) {
  try {
    const decodedToken = await authUser({
      token: req.headers.authorization.split(" ")[1],
    });

    if (decodedToken.role === "ADMIN") {
      next();
    } else {
      return res.status(401).json({
        log: "invalid role",
      });
    }
  } catch (err) {
    return res.status(500).json({
      log: "error on auth",
      error: err.message,
    });
  }
}

module.exports = roleMiddleware;
