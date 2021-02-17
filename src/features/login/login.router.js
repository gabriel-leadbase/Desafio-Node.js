const loginService = require("./login.service");

module.exports = (app) => {
  /**
   * POST: /login
   * body{
   *  "login": "01238970561",
   *  "password": "z1x2c3v4"
   * }
   */
  app.post("/login", async (req, res) => {
    const [err, data] = await loginService.login(req.body);
    if (err) return res.status(400).json(err);
    res.status(200).json(data);
  });
};
