import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  }

  async show(req, res) {
    return res.send('ok');
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      cpf: Yup.string().required(),
      password: Yup.string().required().min(6),
      role: Yup.string().required(),
      permission: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user = await User.create(req.body);

    return res.json(user);
  }

  async update(req, res) {
    return res.send('ok');
  }

  async delete(req, res) {
    return res.send('ok');
  }
}

export default new UserController();
