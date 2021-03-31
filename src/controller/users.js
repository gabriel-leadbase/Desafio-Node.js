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
  
}