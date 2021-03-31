export default class UserController {
  constructor(User) {
    this.User = User
  }

  async get(req, res) {
    try {
      const users = await this.User.find({})
      res.send(users)
    } catch (err) {
      res.status(400).send(err.message)
    }
  }

  async getById(req, res) {
    const {
      params: { id }
    } = req;
    try {
      const user = await this.User.findOne({ _id: id });
      // console.log(user)
      res.send(user);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async createUser(req, res) {
    const user = new this.User(req.body);
    try {
      await user.save();
      res.status(201).send(user);
    } catch (err) {
      res.status(422).send(err.message);
    }
  }

  async updateUser(req, res) {
    const idUser = req.params.id;
    const bodyNewUser = req.body;

    try {
      const findedUser = await this.User.findById(idUser);

      findedUser.name = bodyNewUser.name;
      findedUser.cpf = bodyNewUser.cpf;
      findedUser.role = bodyNewUser.role;
      if (bodyNewUser.password) findedUser.password = bodyNewUser.password;

      await findedUser.save();
      res.sendStatus(200);
    } catch (err) {
      res.status(422).send(err.message);
    }
  }

  async deleteAll(req, res) {
    try {
      await this.User.deleteMany();
      res.sendStatus(204);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async deleteById(req, res) {
    const userId = req.params.id;
    try {
      await this.User.deleteOne({ _id: userId });
      res.sendStatus(204);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }


}