import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  }

  async show(req, res) {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User does not found' });
    }

    return res.json(user);
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

    const existentUser = await User.findOne({ where: { cpf: req.body.cpf } });

    if (existentUser) {
      return res.status(403).json({ error: 'CPF alrealdy registered' });
    }

    const user = await User.create(req.body);

    return res.json(user);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      permission: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User does not found' });
    }

    const updatedUser = await user.update(req.body);

    return res.json(updatedUser);
  }

  async delete(req, res) {
    const userToDelete = await User.findByPk(req.params.id);

    if (!userToDelete) {
      return res.status(404).json({ error: 'User does not found' });
    }

    await userToDelete.destroy();

    return res.status(200).json('User was deleted');
  }
}

export default new UserController();
