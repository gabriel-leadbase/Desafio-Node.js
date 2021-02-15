const loginService = require("./login.service");

module.exports = (app) => {
  app.post("/user/create", async (req, res) => {
    try {
      const result = await loginService.createUser(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json("ERROR: ", error);
    }
  });

  app.post("/login", async (req, res) => {
    const [err, data] = await loginService.login(req.body);
    if (err) return res.status(400).json(err);
    res.status(200).json(data);
  });

  app.post("/logout", (req, res) => {
    res.json({ auth: false, token: null });
  });

  app.get("/users", async (req, res) => {
    const result = await loginService.getUsers();
    res.status(200).json(result);
  });
};
