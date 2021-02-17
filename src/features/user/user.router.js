const userService = require("./user.service");

module.exports = (app) => {
  /**
   * POST: /users/create
   * headers: "x-access-token=tokenJWT"
   * body:{
   *  "name": "Mario da Silva",
   *  "cpf": "36527902647",
   *  "password": "q1w2e3r4",
   *  "role": "vendedor"
   * }
   */
  app.post("/users/create", async (req, res) => {
    const [err, data] = await userService.createUser(req.body);
    if (err) return res.status(400).json(err);
    res.sendStatus(201);
  });

  /**
   * GET: /users
   * headers: "x-access-token=tokenJWT"
   */
  app.get("/users", async (req, res) => {
    const [err, data] = await userService.getUsers();
    if (err) return res.status(400).json(err);
    res.status(200).json(data);
  });

  /**
   * POST: /users/permissions/add
   * headers: "x-access-token=tokenJWT"
   * body: {
   *  "id": "602c22a6afd0f71f3ce44382",
   *  "permission": "caixa"
   * }
   */
  app.post("/users/permissions/add", async (req, res) => {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    const [err, data] = await userService.addPermissions(req.body, token);
    if (err) return res.status(400).json(err);
    res.status(200).json(data);
  });

  /**
   * DELETE: /users/permissions/add
   * headers: "x-access-token=tokenJWT"
   * body: {
   *  "id": "602c22a6afd0f71f3ce44382",
   *  "permission": "caixa"
   * }
   */
  app.delete("/users/permissions/remove", async (req, res) => {
    const [err, data] = await userService.removePermissions(req.body);
    if (err) return res.status(400).json(err);
    res.status(200).json(data);
  });
};
