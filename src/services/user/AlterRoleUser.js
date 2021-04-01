import User from '../../models/User';
import AppError from '../../errors/AppError';

class AlterRoleUser {
  async execute({ cpf }) {
    const user = await User.findOne({ where: { cpf } });

    if (!user) {
      return new AppError('usuario não existe', 400);
    }

    if (user.admin === true) {
      await user.update({ admin: false });
    } else {
      await user.update({ admin: true });
    }
    return user;
  }
}
export default AlterRoleUser;
